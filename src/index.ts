import { MessageImpl, type Message } from './message'
import { Thread } from './thread'

export default class AIAChat {
  public thread: Thread
  public message: Message

  constructor (
    private readonly apiKey: string
  ) {
    this.thread = new Thread(apiKey)
    this.message = new MessageImpl(apiKey)
  }
}

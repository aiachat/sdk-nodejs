import FormData from 'form-data'
import { createReadStream } from 'fs'
import { api } from './defaults/constants'
export interface Message {
  send: (params: Message.Params) => Promise<Message.Result>
}

export namespace Message {
  export interface Params {
    threadId: string
    assistantId: string
    message?: string
    file?: string
  }

  export interface Result {
    messages: string[]
  }
}

export class MessageImpl implements Message {
  constructor (
    private readonly apiKey: string
  ) { }

  public async send (params: Message.Params): Promise<Message.Result> {
    if (!params.message && !params.file) {
      throw new Error('You must provide a message or a file')
    }
    if (params.message && params.file) {
      throw new Error('You must provide only one message or file')
    }

    if (params.message) {
      return await this.sendMessage(params)
    }

    return await this.sendFile(params)
  }

  private async sendMessage (params: Message.Params): Promise<Message.Result> {
    const response = await api.post('/message', {
      message: params.message,
      threadId: params.threadId,
      assistantId: params.assistantId
    }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`
      }
    })
    return response.data
  }

  private async sendFile (params: Message.Params): Promise<Message.Result> {
    const form = new FormData()
    form.append('threadId', params.threadId)
    form.append('assistantId', params.assistantId)
    form.append('file', createReadStream(params.file as string))

    const response = await api.request({
      url: '/message',
      method: 'post',
      maxBodyLength: Infinity,
      data: form,
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        ...form.getHeaders()
      }
    })
    return response.data
  }
}

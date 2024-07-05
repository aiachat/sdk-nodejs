import { api } from './defaults/constants'

export class Thread {
  constructor (
    private readonly apiKey: string
  ) { }

  public async create (): Promise<{ id: string }> {
    const response = await api.post('/thread', {}, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`
      }
    })
    return response.data
  }
}

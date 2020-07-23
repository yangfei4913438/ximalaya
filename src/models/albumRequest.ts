import Http from '@/config/httpClass';

class albumRequest extends Http {
  /**
   * 请求节目信息
   */
  async getAlbum(id: string) {
    return await this.request({
      url: 'album/list',
      params: { id },
    });
  }
}

export default new albumRequest();

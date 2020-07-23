import Http from '@/config/httpClass';

class HomeRequest extends Http {
  /**
   * 请求轮播图
   */
  async getCarouselList() {
    return await this.request({
      url: 'carousel',
    });
  }

  /**
   * 猜你喜欢列表
   */
  async getGuestList() {
    return await this.request({
      url: 'guess',
    });
  }

  /**
   * 首页列表
   */
  async getChannelList(page = 1, limit = 20) {
    return await this.request({
      url: 'channel',
      params: { page, limit },
    });
  }
}

export default new HomeRequest();

import Http from '@/config/httpClass';

class CategoryRequest extends Http {
  /**
   * 请求分类列表
   */
  async getCategorylList() {
    return await this.request({
      url: 'category',
    });
  }
}

export default new CategoryRequest();

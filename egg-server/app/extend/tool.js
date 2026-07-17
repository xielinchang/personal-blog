'use strict';

module.exports = {
  filterAndSortArticles(htmlKey, articles) {
    // 分解key，并给每个子串一个权重，权重按照字符数量的立方计算
    const keys = [];
    for (let i = 1; i <= htmlKey.length; i++) {
      for (let j = 0; j + i <= htmlKey.length; j++) {
        keys.push({
          key: htmlKey.substring(j, j + i),
          weight: i > 1 ? i * i * i : 0, // 至少要对一定数量的字符以上才分配权重
        });
      }
    }
    // 计算每篇文章的总权重
    let articleWeights = articles.map(article => {
      let totalWeight = 0;
      for (const { key, weight } of keys) {
        const reg = new RegExp(key, 'g');
        const count = (article.html.match(reg) || []).length;
        if (key.length === htmlKey.length) {
          // 如果完全符合，给予较高的总权重
          totalWeight += count * weight * 999;
        } else {
          totalWeight += count * weight;
        }
        console.log(count);
      }
      return {
        article,
        weight: totalWeight,
      };
    });
    // 过滤
    articleWeights = articleWeights.filter(({ weight }) => weight > 10);

    // 按照权重进行降序排序
    articleWeights.sort((a, b) => b.weight - a.weight);

    // 返回排序后的文章数组
    return articleWeights.map(({ article }) => article);
  },
};

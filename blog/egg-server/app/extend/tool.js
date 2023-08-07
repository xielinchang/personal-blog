'use strict';
module.exports = {
  calculateLevenshteinDistance(str1, str2) {
    const m = str1.length;
    const n = str2.length;
    const dp = [];

    for (let i = 0; i <= m; i++) {
      dp[i] = [];
      dp[i][0] = i;
    }

    for (let j = 0; j <= n; j++) {
      dp[0][j] = j;
    }

    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        if (str1[i - 1] === str2[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1];
        } else {
          dp[i][j] = Math.min(
            dp[i - 1][j - 1] + 1, // 替换
            dp[i][j - 1] + 1, // 插入
            dp[i - 1][j] + 1 // 删除
          );
        }
      }
    }

    return dp[m][n];
  },
  matchSearch(target, array) {
    const matches = [];
    const threshold = 5; // 定义一个阈值，表示相差最大允许的距离
    array.forEach(item => {
      const distance = this.calculateLevenshteinDistance(target, item);
      if (distance <= threshold) {
        matches.push({ item, distance });
      }
    });
    // 根据距离进行排序
    return matches.sort((a, b) => a.distance - b.distance);
  },


};


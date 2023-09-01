'use strict';
module.exports = {
  // 计算字符串
  calculateEditDistance(str1, str2) {
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
  // 计算字符串相似度
  calculateStringSimilarity(str1, str2) {
    const distance = this.calculateEditDistance(str1, str2);
    const maxLength = Math.max(str1.length, str2.length);
    const similarity = (maxLength - distance) / maxLength;
    return similarity;
  },

};


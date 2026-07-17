<template>
  <div class="tooltip-base-box">
    <div class="row center">
      <j-tooltip class="box-item" effect="dark" content="Top Center prompts info" placement="top">
        <j-button>top</j-button>
      </j-tooltip>
    </div>
    <div class="row">
      <j-tooltip class="box-item" effect="dark" content="Left Center prompts info" placement="left">
        <j-button class="mt-3 mb-3">left</j-button>
      </j-tooltip>
      <j-tooltip
        class="box-item"
        effect="dark"
        content="Right Center prompts info"
        placement="right"
      >
        <j-button>right</j-button>
      </j-tooltip>
    </div>
    <div class="row center">
      <j-tooltip
        class="box-item"
        effect="dark"
        content="Bottom Center prompts info"
        placement="bottom"
      >
        <j-button>bottom</j-button>
      </j-tooltip>
    </div>
  </div>
</template>

<style scoped>
  .tooltip-base-box {
    width: 600px;
  }
  .tooltip-base-box .row {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .tooltip-base-box .center {
    justify-content: center;
  }
  .tooltip-base-box .box-item {
    margin-top: 10px;
  }
</style>

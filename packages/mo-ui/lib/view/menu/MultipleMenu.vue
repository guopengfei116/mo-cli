<template>
  <div class="dropMenu_box">
    <el-popover
      placement="bottom-start"
      trigger="hover"
      popper-class="el-popover-black"
    >
      <div class="menu">
        <ul class="list_box">
          <li v-for="(item, key) in data" :key="`${key}_${item.group}`">
            <h3 class="list_title">
              <i :class="item.icon"></i>
              {{ item.group }}
            </h3>
            <p
              v-for="(list, index) in item.list"
              :key="`${index}_${list.name}`"
            >
              <el-link
                :underline="false"
                :href="list.url"
                :class="{ isActive: isActive(list.url) }"
              >
                {{ list.name }}
              </el-link>
            </p>
          </li>
        </ul>
      </div>
      <span class="tigger" slot="reference">
        <slot></slot>
      </span>
    </el-popover>
  </div>
</template>

<script>
export default {
  name: "MultipleMenu",
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    isActive(url) {
      const activeUrl = window.location.pathname.split('/')[1];
      return url.includes(activeUrl);
    }
  }
};
</script>
<style lang="less" scoped>
ul,
li {
  padding: 0;
  margin: 0;
  list-style: none;
}
* {
  box-sizing: border-box;
}
.dropMenu_box {
  display: inline-block;
  .tigger {
    cursor: pointer;
  }
}

.menu {
  border: 0;
  background-color: #24292e !important;
  width: 561px;
  padding: 0 0 20px 20px;
  .list_box {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    li {
      padding-right: 20px;
      width: 180px;
      font-size: 14px;
    }
    .list_title {
      color: #7c878e;
      border-bottom: 1px solid #505b65;
      padding-bottom: 8px;
    }
    p {
      padding: 0;
      background: 0 0;
      font-size: 12px;
      .el-link {
        margin-top: 8px;
        display: block;
        height: 18px;
        line-height: 18px;
        padding-left: 0;
        transition: all 0.4s;
        box-sizing: border-box;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 12px;
        color: #aaa;
        &.isActive {
          color: #409eff;
        }
        &:hover {
          color: #409eff;
        }
      }
    }
  }
}
</style>
<style lang="less">
.el-popper.el-popover-black {
  background-color: #24292e !important;
  .popper__arrow {
    border-top-color: #24292e !important;
    &::after {
      border-bottom-color: #24292e !important;
    }
  }
}
</style>

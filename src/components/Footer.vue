<template>
    <footer class="footer">
        Copyright © 2021 <a href="https://www.figma.com/file/uTXbLAYaEaoSCfkaZh65Eh/%E8%87%BA%E7%81%A3%E6%97%85%E9%81%8A%E6%99%AF%E9%BB%9E%E5%B0%8E%E8%A6%BDrwd?node-id=147%3A374" target="blank">卡哇邦嘎</a>
    </footer>
</template>

<style lang="scss" scoped>
.footer{
    background-color: rgb(204, 204, 204);
    padding: 39px 57px;
    text-align: center;

    a {
      color: $color-primary;
    }

    @include mobile {
        padding-top: 22px;
        padding-bottom: 22px;
    }
}
</style>

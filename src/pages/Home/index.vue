<template>
    <div>
        <Typenav></Typenav>
        <Banner></Banner>
        <Today></Today>
        <Floor></Floor>
    </div>
</template>

<script>

import Banner from '../Home/Banner'
import Floor from '../Home/Floor'
import Today from '../Home/Today'

export default {
    name:'Home',
    components:{Banner,Floor,Today},
    mounted() {
        //将banner的数据存到vuex
        this.$store.dispatch("getBannerList");
        //将banner的数据存到vuex
        this.$store.dispatch("getFloorList");
    },
       
}
</script>

<style lang="less" scoped>

</style>
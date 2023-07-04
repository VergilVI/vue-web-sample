<template>
	<div class="content">

		<van-form validate-first @failed="onFailed" @submit="onSubmit">
			<!-- 通过 pattern 进行正则校验 -->
			<van-field v-model="value1" label="*所在地区" name="aera" placeholder="所在地区"
				:rules="[{ pattern, message: '请选择所在地区' }]" />
			<!-- 通过 validator 进行函数校验 -->
			<van-field v-model="value2" label="*参会人姓名" name="name" placeholder="参会人姓名"
				:rules="[{ validator, message: '请输入参会人姓名' }]" />

			<div style="margin: 16px;">
				<van-button round block type="info" native-type="submit">提交</van-button>
			</div>
		</van-form>




		<van-popup v-model="show" round position="bottom">
			<van-cell-group inset class="map_cell">
				<van-cell title="百度地图"
					url="https://api.map.baidu.com/marker?location=22.543702,114.053991&title=五洲宾馆&content=深圳特区报创刊40周年座谈会议&output=html&zoom=14" />
				<van-cell title="腾讯地图"
					url="https://apis.map.qq.com/uri/v1/marker?marker=coord:22.537734,114.047692;title:五洲宾馆;addr:深圳特区报创刊40周年座谈会议&referer=myapp" />
				<van-cell title="高德地图"
					url="https://uri.amap.com/marker?position=114.047666,22.536538&name=五洲宾馆&src=深圳特区报创刊40周年座谈会议&coordinate=gaode&callnative=0" />
				<!-- <van-cell title="苹果地图" url="" /> -->
			</van-cell-group>
			<van-cell-group inset class="map_cell">
				<van-cell title="取消" @click="hideMapPoP" />
			</van-cell-group>
		</van-popup>

	</div>
</template>

<script>
import { getUrlParam, redirect } from "@/assets/static/js/utils.js";

// import localCache from '@/assets/static/js/cache.js'

import Vue from 'vue';
import { Grid, GridItem, Popup, Cell, CellGroup, Form, Field, Button } from 'vant';
import "vant/lib/index.css";
Vue.use(Grid);
Vue.use(GridItem);

Vue.use(Popup);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Form);
Vue.use(Field);
Vue.use(Button);


export default {
	name: 'Service',
	data() {
		return {
			show: false,

			serviceList: [],


		}
	},

	mounted() {
		// localCache.setCache('aaa', '123')

		// let token = localCache.getCache('aaa')
		// console.log(token)

		// this.showPopup()

		// this.getServices()
	},
	components: {
	},
	methods: {
		showPopup() {
			this.show = true;
		},


		hideMapPoP() {
			this.show = false
		},



		goLink(url) {
			location.href = url
		},




	},

}
</script>


<style src="@/assets/static/style/meeting.css"></style>
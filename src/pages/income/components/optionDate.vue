<template>
	<div class="income">
		<ul v-if="isempty">
			<li>
				<div>
					<div class="block">
						<span class="demonstration">日期筛选：</span>
						<el-date-picker @change="change" v-model="value1" type="date" placeholder="开始时间 ">
						</el-date-picker>
						<el-date-picker v-model="value2" type="date" @focus="focus" :picker-options="pickerOptions1" placeholder="结束时间">
						</el-date-picker>
					</div>
				</div>
			</li>
		</ul>
		<div v-else>
			空
		</div>
	</div>
</template>

<script>
	export default {
		name: 'optionDate',
		data() {
			return {
				isempty: true,
				value1: '', //开始日期
				value2: '', //结束日期
				pickerOptions1: {} //结束日期配置

			}
		},
		methods: {
			change() {
				console.log(this.value1);
			},
			focus(time) {
				let aa = new Date(this.value1).getTime()
				console.log(current)
				this.pickerOptions1 = {
					disabledDate(time) {
						return time.getTime() < aa
					},
				}
			},
			disabledDate(time) {
				return time.getTime() > new Date(value1).getTime()
			},
		}

	}
</script>

<style scoped>
	.block {
		margin-top: 0.88rem;
		padding: 0 0.3rem;
		display: flex;
		justify-content: flex-start;
		flex-direction: row;
		flex-wrap: nowrap;
		align-items: center;
		background:#fff;
		padding:0.2rem 0.3rem;
	}
	
	.demonstration{
		flex-wrap:nowrap;
		font-size:0.28rem;
	}
	
	.block>>>.el-input__prefix {
		display: none;
	}
	
	.block>>>.el-date-editor.el-input, .el-date-editor.el-input__inner{
		width:2rem;
		margin-left:0.2rem;
	}
	
	.block>>>.el-input--prefix .el-input__inner{
		padding-left: 0.2px;
		text-align: center;
	}
	.block>>>.el-input--suffix .el-input__inner{
		padding-right: 0.2px;
		text-align: center;
	}
</style>
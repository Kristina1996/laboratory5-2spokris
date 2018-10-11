<template>
	<div id = "hello">
		<h2>{{message}}</h2>
		<div class="form__field">
			<div class="form__label">
				<strong>Please choose a color:</strong>
			</div>	
			<div class="form__input">
				<swatches v-model="color" :colors="colors" @input="changeHandler" row-length="5" popover-to="left">
				</swatches>
			</div>
		</div>
		
		<ul>
			<li v-for="todo in todos"
				v-bind:style="{ background: todo.color}"> 
				{{todo.color}}</li>
		</ul>
	
	</div>
</template>

<script>

	import Swatches from 'vue-swatches';
	import VueMqtt from 'vue-mqtt';
	
	let nextTodoId = 1
	
	export default {
		name: 'app',
		components: {
			Swatches
		},
		data () {
			return {
				message: 'Vue.js and MQTT',
				color: '#A463BF',
				colors: [
					['#F64272', '#F6648B', '#F493A7', '#F891A6', '#FFCCD5' ],
					['#8b5aff', '#a27bff', '#b99cff', '#d0bdff', '#e8deff' ],
					['#51e5db', '#74ebe3', '#96f0ea', '#b9f5f1', '#dcfaf8' ],
					['#ffa51a', '#ffb748', '#ffc976', '#ffdba3', '#ffedd1' ]
				],
				newTodoText: '',
				todos: [
				{
					id: nextTodoId++,
					color: 'Learn Vue'
				},
				{
					id: nextTodoId++,
					color: 'Fall in love'
				}]
			}
		},
		mounted () {
			this.$mqtt.subscribe('vlsu/sensorkris')
		},
		methods: {
			// обработчик выбора цвета (публикует его в топик)
			changeHandler: function(event) {
				this.$mqtt.publish('vlsu/sensorkris', this.color);
				console.log(this.color);
			}
		},
		mqtt: {
			// обработчик сработает когда в топик опубликовали значение
			'vlsu/sensorkris'(data, topic) {
				console.log(topic + ': ' + String.fromCharCode.apply(null, data));
				this.todos.push({
					topic: topic,
					color: String.fromCharCode.apply(null, data)
				})
			}
		}
	}
</script>

<style>
	@import url("//unpkg.com/element-ui@2.4.8/lib/theme-chalk/index.css");

	#hello {
		font-family: Verdana;
		color: navy;
	}
	li {
		width: 100px;
		height: 40px;
		padding: 7px 20px;
		margin-bottom: 10px;
		border-radius: 5px;
		border-left: 10px solid #e8deff; 
		list-style-type: none;
	}
	ul > li:hover {
		box-shadow: 0 0 10px rgba(0,0,0,0.5);
	}
</style>
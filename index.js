var wrapper = new Vue({
    el: "#wrapper",
    data() {
        return {
            nameList: [{
                id: 1,
                name: '大娃'
            }, {
                id: 2,
                name: '二娃'
            }, {
                id: 3,
                name: '三娃'
            },{
                id: 4,
                name: '四娃'
            }, {
                id: 5,
                name: '五娃'
            }, {
                id: 6,
                name: '六娃'
            }, {
                id: 7,
                name: '七娃'
            }],
            personData: {
                name: '',
                yesOrNo: '加班'
            },
            timeList: [{
                time: '半天',
                id: 1
            }, {
                time: '一天',
                id: 2
            }],
            noAddPerson: [],
            sixAddPerson:[],
            sevenAddPerson:[],
            currentSelect: null,
            oldvalue:'',
            newvalue:'',
            oldName:'',
            newName:'',
            sixAddValue:0,
            sevenAddValue:0,
            noAddValue:0,

        };
    },
    computed: {
        noAddDisable(){
            return this.currentSelect == 1;
        }
    },
    methods: {
        loadChart() {
            echarts.dispose($('#chart')[0]);
            let chartInstance = echarts.init($('#chart')[0]);
            let option = {
                color : ["#38B5FA", "#FFB750", "#99DC3D"],
                title: {
                    left: 'center',
                    text: '统计饼图',
                    textStyle: {
                        color: '#333333',
                        fontSize: 16,
                    }
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                legend: {
                    left: 'center',
                    data: ['No','Saturday', 'Sunday'],
                    bottom:0
                },
                grid: {
                    x: '100px',
                    height: 280,
                    left: 60,
                    right: 120,
                    bottom: 50,
                    top: 10,
                    containLabel: true
                },
                series: [{
                    name: '占比',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],
                    data: [{
                            value: this.noAddValue,
                            name: 'No'
                        },
                        {
                            value: this.sixAddValue,
                            name: 'Saturday'
                        },
                        {
                            value: this.sevenAddValue,
                            name: 'Sunday'
                        }
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }]
            };
            chartInstance.setOption(option);
        },
        loadBarChart(){
            echarts.dispose($('#barChart')[0]);
            let chartInstance = echarts.init($('#barChart')[0]);
            let option = {
                color:"#5ea9fc",
                title : {
                    left: 'center',
                    text: '统计柱状图',
                    textStyle: {
                        color: '#333333',
                        fontSize: 16,
                    },
                },
                xAxis : {
                    type: 'category',
                    boundaryGap: true,
                    axisTick: {
                        inside: true,
                        alignWithLabel: true,
                        interval: 0,
                        lineStyle: {
                            color: '#dddddd'
                        }
                },
                splitLine: {
                    show: false,
                    lineStyle: {
                        color: ['#ddd']
                    },
                    width: 1
                },
                axisLabel: {
                    margin: 15,
                    textStyle: {
                        color: '#333333',
                        fontSize: 12
                    }
                },
                data: ['No','Saturday','Sunday']
            },
            tooltip : {
                trigger: 'axis',
                axisPointer: {
                    lineStyle: {
                        color: '#2e7bcc',
                        width: 80,
                        opacity: 0.2
                    },
                },
                extraCssText: 'box-shadow: 0 0 4px rgba(0, 0, 0, 0.12);',
                textStyle: {
                    color: '#333',
                    fontWeight: 'bold'
                },
                padding: 16,
                backgroundColor: 'rgba(255, 255, 255, .95)',
                borderRadius: 4,
                borderWidth: 1,
                borderColor: '#bbbbbb',
                shadowColor: '#000000',
                shadowBlur: 4,
            },
            //这里是y坐标
            yAxis : {
                // boundaryGap: true,
                type: 'value',
                scale: true,
                max: null,
                axisLine: {
                    show: false
                },
                axisLabel: {
                    show: true,
                    interval: 'auto',
                    formatter: '{value}',
                    margin: 5,
                    textStyle: {
                        color: "#333333",
                        fontSize: 12
                    }
                },
                splitNumber:2,
                axisTick: {
                    show: false
                },
                show: true
            },
           
            legend : {
                orient: 'horizontal',
                x: 'center',
                y: 'bottom',
                top: 382,
                itemGap: 40,
                data: ['统计结果柱状图']
            },
            grid : {
                left: '0%',
                right: '5%',
                bottom: '10%',
                top: 45,
                containLabel: true
            },
            series : {
                name: '统计结果柱状图',
                barWidth: '15px',
                type: 'bar',
                data:[this.noAddValue,this.sixAddValue,this.sevenAddValue]
            },

            }
            chartInstance.setOption(option);
        },
        changeSelect(item) {
            if(item==1 && this.personData.name){
                this.currentSelect = 1;
                if(item ==1 ){
                    this.noAddPerson.push(this.personData.name);
                    let newArr = this.noAddPerson;
                    this.noAddPerson = [...new Set(newArr)];
                    this.getChartData();
                }
            }
            else if(item==2){
                this.currentSelect = 2;
            }
        },
        getSixAdd(){
            let vm = this;
            $(function(){
                $("#sixSelect").change(function(){
                   if(vm.personData.name && vm.currentSelect == 2){
                    vm.sixAddPerson.push(vm.personData.name + '周六' + vm.personData.six);
                    let newArr =  vm.sixAddPerson;
                    vm.sixAddPerson = [...new Set(newArr)];
                    vm.getChartData();
                   }
                });
            });    
        },
        getSevenAdd(){
            let vm = this;
            $(function(){
                $("#sevenSelect").change(function(){
                   if(vm.personData.name && vm.currentSelect == 2){
                    vm.sevenAddPerson.push(vm.personData.name + '周天' + vm.personData.seven);
                    let newArr =  vm.sevenAddPerson;
                    vm.sevenAddPerson = [...new Set(newArr)];
                    vm.getChartData();
                   }
                });
            });    
        },
        onmousedownFunction(){
            let vm = this;
            $(function(){
                $("#nameSelect").mousedown(function(item){
                    vm.oldName = $(this).children('option:selected').val();
                })
            })
        },
        onchangeFunction(){
            let vm = this;
            $(function(){
                $("#nameSelect").change(function(item){
                    vm.newName = $(this).children('option:selected').val();
                    if(vm.newName !== vm.oldName){
                        vm.currentSelect = null;
                        vm.personData.six = '';
                        vm.personData.seven = '';
                    }
                })
            })
        },
        removeNoAdd(noAdd,index){
            this.noAddPerson.splice(index, 1); 
            this.getChartData();
        },
        removeSixAdd(noAdd,index){
            this.sixAddPerson.splice(index,1);
            this.getChartData();
        },
        removeSevenAdd(noAdd,index){
            this.sevenAddPerson.splice(index,1);
            this.getChartData();
        },
        getChartData(){
            this.sixAddValue = this.sixAddPerson.length;
            this.sevenAddValue = this.sevenAddPerson.length;
            this.noAddValue = this.noAddPerson.length;
            this.loadChart();
            this.loadBarChart();
        }
    },

    mounted: function () {
        this.getSixAdd();
        this.getSevenAdd();
        this.onmousedownFunction();
        this.onchangeFunction();
        this.getChartData();
      

    }
})
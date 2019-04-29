module.exports = {
  bar: {
    chart: {
        type:'column',//指定图表的类型，默认是折线图（line）
    },
    credits: {
      enabled:false
    },//去掉地址
    title: {
        text: '学生平均成绩波动统计' //指定图表标题
    },
    colors: ['rgba(148,41,135,0.2)', 'rgba(148,41,135,0.2)', 'rgba(148,41,135,0.2)', 'rgba(148,41,135,0.2)',
            'rgba(148,41,135,0.2)'  ],
    xAxis: {
            categories: ['高一第一学期3月月考', '高一第一学期期中考试', '高一第一学期期中考试','高一第一学期期中考试','高一第一学期期中考试'], //指定x轴分组
        },
    yAxis: {
            title: {
                text: ' ', //指定y轴的标题
            },
        },
    plotOptions: {
            column: {
                colorByPoint:true,
                borderColor: 'rgba(148,41,135,1)',
            },
        },

    series: [{ //指定数据列
            name: '小明',
            data: [1000, 5000, 4000,5000,2000] //数据
        }],

               
  }
}
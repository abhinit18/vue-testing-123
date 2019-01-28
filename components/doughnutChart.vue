<doughnut-chart :data="chartData">

</doughnut-chart>
<script>
import { Doughnut, mixins } from 'vue-chartjs'

export default {
    extends: Doughnut,
    mixins: [mixins.reactiveProp],
    props: ['chartData', 'options'],
    data() {
        return {
        }
    },
    mounted() {
        this.renderChart(this.chartData, this.options)
    }
}
</script>

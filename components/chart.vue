<line-chart :data="chartData">

</line-chart>
<script>
import { Line, mixins } from 'vue-chartjs'

export default {
    extends: Line,
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

<bar-chart :data="chartData">

</bar-chart>
<script>
import { Bar, mixins } from 'vue-chartjs'

export default {
    extends: Bar,
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

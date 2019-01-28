<template>
    <ul>
        <li v-if="!$store.getters['isParent']()&&!profile"><i class="material-icons" >&#xE838;</i> {{$t('index.grade')}} : {{profile? (profile.grade? profile.grade.join(','): ''): ($store.state.initialData.grades? $store.getters['getGradeCsv'](): '')}}</li>
        <li v-if="!$store.getters['isParent']()&&profile && profile.role !== 'PARENT'"><i class="material-icons" >&#xE838;</i> {{$t('index.grade')}} : {{profile? (profile.grade? profile.grade.join(','): ''): ($store.state.initialData.grades? $store.getters['getGradeCsv'](): '')}}</li>
        <li v-if="!$store.getters['isParent']()&&!profile"><i class="material-icons">&#xE80C;</i> {{$t('index.school')}} : {{profile? profile.school: ($store.state.initialData.school? $store.state.initialData.school.name: '')}}</li>
        <li v-if="!$store.getters['isParent']()&&profile&&profile.role !== 'PARENT'"><i class="material-icons">&#xE80C;</i> {{$t('index.school')}} : {{profile? profile.school: ($store.state.initialData.school? $store.state.initialData.school.name: '')}}</li>
        <li><i class="material-icons">&#xE0C8;</i> {{$t('index.location_city')}} : {{profile? profile.city: ($store.state.initialData.city? $store.state.initialData.city.name: '')}}</li>
        <li class="bio"><i class="material-icons">&#xE8A3;</i> <p>{{profile? profile.bio: ''}}</p></li>
    </ul>
</template>

<script>
export default {
    props: ['profile'],
    computed: {
    }
}
</script>

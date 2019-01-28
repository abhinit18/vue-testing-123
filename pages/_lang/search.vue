<template>
	<div class="studyPopUpPageOuter searchPopUpPageOuter">
		<div class="studyPopUpPage">
			<a class="pclose" @click="closePopup"><span><i class="material-icons">&#xE5CD;</i></span>{{$t('settings.close')}}</a>
			<div class="megaSearch">
				<languageSelectBox/>
				<h3 class="smallHeading">{{$t('search.search')}}</h3>
				<div class="searchBox" v-on-click-outside="clickOutsideAutoComplete">
					<i class="material-icons">&#xE8B6;</i>
					<input type="text" v-on:keyup.enter="fetchResults" class="form-control " :placeholder="$t('search.subject_name')" v-model="query" @input="changeSearchBar">
					<i v-if="query.length > 0" class="material-icons closeit" @click="clearSearchBar">&#xE5CD;</i>
					<button class="btn btn-primary" @click="fetchResults">{{$t('search.search')}}</button>
					<div class="dropdown" v-if="autoComplete.length>0">
						<ul v-for="section in autoComplete">
							<li class="head"><a>{{section.type}} ({{section.totalMatched}})</a></li>
							<li v-for="content in section.contentSearchAutoList" @click="goToContent(content)">
								<div class="thumb"><img :src="content.thumbnail" class="tempContentSize"><span :class="getContentClass(section.type)"></span></div>
								<a>{{content.title}}</a></li>
							<li @click="getMoreInSection(section.type)" class="link" v-if="(section.totalMatched - autoCompletePageSize)>0"><a>{{section.totalMatched - autoCompletePageSize}} {{$t('common.more')}} {{getTypeLocale(section.type)}}</a></li>
						</ul>
					</div>
				</div>
				<div class="RecommendedSec" v-if="autoComplete.length==0">
					<div class="resFilter">
						<label class="control control checkbox" v-for="type in $store.state.content.types">
						<input type="radio" :checked="selectedType===type.name" @change="changeTab(type.name)">
							<span>{{$t(type.code)}}</span>
						</label>
					</div>
					<div class=" clearfix" >
					<div id="noSearchedItems">
						<div class="placeholderSec">
	                      <div class="placeHoldConMid zoomIn">
	                          <div class="placeHolderImg">
	                              <img src="~assets/images/placeholder/plcHold_empty.png">
	                          </div>
	                          <h2 class="placeholderHeading">{{$t('parentLog.noResult')}}</h2>
	                      </div>
	                 	 </div>
					</div>
						<div class=" clearfix itmesOuterRow">
							<contentBox :content="content" :cornerElement="index" v-for="(content, index) in data" :key="content.contentId" :isSearch="true"/>
						</div>

						<div class="placeholderSec" v-if="!data">
							 <div class="placeHoldConMid zoomIn">
									 <div class="placeHolderImg">
										 <img src="~assets/images/placeholder/plcHold_empty.png">
									 </div>
									 <h2 class="placeholderHeading">{{$t('blankPlaceholder.Resource')}}</h2>
									 <p class="placeHoldTxt">{{$t('blankPlaceholder.ResourceText')}} </p>
							 </div>
					 </div>
					</div>
				</div>
				<div class="abcOverlay" v-if="registerByParent">
					<div class="parentStuCardSec abcOverlayInner">

						<div class="parentStuCard">
							<div class="parentStuHeadSec">
								<!-- <button type="button" @click="registerByParent = false" class="btn btn-link closeBtn">
								<i class="material-icons">close</i></button> -->
								<p class="parentStuName">{{$t('parentLog.parentConfirmation')}}</p>
							</div>
							<!-- <div class="parntStuCardInner">
								<p class="resultStatusPopTxt">
								{{$t('parentLog.popTxt1')}}<br> {{$t('parentLog.popTxt2')}}
								</p>
							</div> -->
							<div class="btmActionBtnSec text-right">
								<!-- <button type="button" @click="registerByParent = false" class="btn btn-link btmActionBtn">
								{{$t('common.cancel')}}
								</button> -->
								<button type="button" @click="goToPlans" class="btn btn-primary btmActionBtn">
								{{$t('register.subscribe')}}
								</button>
							</div>
						</div>
						</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import languageSelectBox from '~/components/languageSelectBox'
	import contentBox from '~/components/contentBox'
	export default {
    middleware: 'authenticated',
		mounted () {
		if(this.$store.state.currentSelectedChild&&this.$store.state.currentSelectedChild.expiryDays <=0){
		this.registerByParent = true
		}else{
		this.fetchResults()
		}
		},
		head () {
			return {
			title: this.$t('search.search')
			}
		},
		layout: 'popupview',
		data() {
			return {
				autoCompletePageSize: 3,
				query: '',
				registerByParent: false,
				selectedType: 'ALL',
				data: [],
				autoComplete: [],
				maxAllowedCharacters: 2000
			}
		},
		methods: {
			clickOutsideAutoComplete () {
				if (this.autoComplete.length>0) {
					this.fetchResults()
				}
			},
			closePopup() {
				this.$router.push(this.$store.getters['locale/getFinalUrl'](`/`))
			},
			changeTab(code, force) {
				if (this.selectedType!==code) {
					this.selectedType = code
					this.fetchResults()
				} else if (force) {
					this.fetchResults()
				}
			},
			fetchResults() {
				document.getElementById("noSearchedItems").style.display = "none";
				if (this.query.length > this.maxAllowedCharacters) {
					this.$toast.error(this.$t('toastMsg.max_character_limit_exceeded'))
				} else {
					this.autoComplete = []
					this.$store.dispatch('search/contentSearch',{type: this.$store.state.content.types.filter(type => (type.name === this.selectedType))[0].searchName, q: this.query, page: 0, size: 100, authToken: this.$store.state.auth.user.token, langCode: this.$store.state.locale.selectedLocale, childId:this.$store.getters['getCurrentChildId']()}).then (
					response => {
					console.log('response 1>>', response)

					let matched = response.data.contents ? response.data.contents.length : 0
					this.$store.dispatch('snowPlowEvent',{category:'SEARCH', action:'CONTENT',label:this.query, property:'', value:matched});

					this.data = response.data.contents? response.data.contents : []
					if (!response.data.contents) {
							// this.$toast.error(this.$t('toastMsg.no_results_found'))
							document.getElementById("noSearchedItems").style.display = "block";
						}
					}, error => {
						this.$toast.error(error.response.data.code)
					})
				}
			},
			goToPlans() {
				this.registerByParent = false
				this.$router.push(this.$store.getters['locale/getFinalUrl']('/mySubscription'))
			},
			fetchAutoComplete () {
				if (this.query.length > this.maxAllowedCharacters) {
					this.$toast.error(this.$t('toastMsg.max_character_limit_exceeded'))
				} else {
					this.$store.dispatch('search/contentAutoComplete',{ q: this.query, page: 0, size: this.autoCompletePageSize, authToken: this.$store.state.auth.user.token, langCode: this.$store.state.locale.selectedLocale, childId : this.$store.getters['getCurrentChildId']()}).then (
					response => {
						let matched = response.data.contentAutoCompleteSearchResp ? response.data.contentAutoCompleteSearchResp[0].totalMatched : 0
						this.$store.dispatch('snowPlowEvent',{category:'SEARCH', action:'CONTENT',label:this.query, property:'', value:matched});
						this.autoComplete = response.data.contentAutoCompleteSearchResp?  response.data.contentAutoCompleteSearchResp : []
					}, error => {
						this.$toast.error(error.response.data.code)
					})
				}
			},
			changeSearchBar () {
				if (this.query.length>=3) {
					this.fetchAutoComplete ()
				} else {
					this.autoComplete = []
				}
			},
			clearSearchBar () {
				this.query = ''
				this.fetchResults()
			},
			goToContent (content) {
				this.$router.push(this.$store.getters['locale/getFinalUrl'](`/contentView/${content.contentId}`))
			},
			getTypeLocale (sectionType) {
				let searchedType = this.$store.state.content.types.filter( type => (type.searchName === sectionType))
				return searchedType.length>0 ? searchedType[0].name : this.$t('search.video')
			},
			getMoreInSection (type) {
				this.autoComplete = []
				this.changeTab((type==='EPUB'? 'EBOOK': type), true)
			},
			getContentClass (type) {
				if (type==='VIDEO') {
					return 'vidicon'
				} else if (type==='ARTICLE') {
					return 'articleicon'
				} else {
					return 'texticon'
				}
			}
		},
		components: {
			languageSelectBox, contentBox
		}
	}
</script>

<style>
	.studyPopUpPage {
		top: 20px;
		position: fixed;
	}

	.onlyOneLink {
		width: 100%
	}

	.whenOnlyLeft {
		text-align: left!important;
	}

	.whenOnlyLeft .material-icons {
		float: left!important;
		margin: 0 0 0 -30px!important;
	}

	.video_thumbnail {
		max-height: 133px
	}

	#noSearchedItems {
		display: none;
	}
</style>

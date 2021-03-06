import TreeMenu from '@/components/TreeMenu'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import td from 'testdouble'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

describe('components', () => {
  describe('TreeMenu', () => {
    let actions
    let store

    beforeEach(() => {
      actions = {
        FETCH_DATA_FOR_SELECTED_NODE: td.function()
      }

      store = new Vuex.Store({actions})
    })

    const propsData = {
      treeMenu: [
        {text: 'test1', children: []},
        {text: 'test2', children: []}
      ]
    }

    it('should load "TreeMenu" as the component name', () => {
      const wrapper = shallowMount(TreeMenu, {propsData})
      expect(wrapper.name()).to.equal('TreeMenu')
    })

    it('should toggle collapse on click of button', () => {
      const wrapper = shallowMount(TreeMenu, {propsData})
      expect(wrapper.vm.isMenuCollapsed).to.equal(false)
      expect(wrapper.vm.collapseText).to.equal('-')

      wrapper.vm.toggleCollapse()
      expect(wrapper.vm.isMenuCollapsed).to.equal(true)
      expect(wrapper.vm.collapseText).to.equal('+')
    })

    it('should compute which tree nodes to show when query changes', () => {
      const wrapper = shallowMount(TreeMenu, {propsData})
      expect(wrapper.vm.filteredTreeMenu).to.deep.equal(propsData.treeMenu)

      wrapper.setData({query: 'test1'})
      const filteredTreeNodes = [{text: 'test1', children: []}]
      expect(wrapper.vm.filteredTreeMenu).to.deep.equal(filteredTreeNodes)
    })

    it('should toggle a node opened when a node is clicked and it is a folder', () => {
      const wrapper = shallowMount(TreeMenu, {propsData})
      const node = {data: {icon: ''}, model: {opened: false}}
      wrapper.vm.itemClick(node)
      expect(node.model.opened).to.equal(true)

      wrapper.vm.itemClick(node)
      expect(node.model.opened).to.equal(false)
    })

    it('should dispatch FETCH_DATA_FOR_SELECTED_NODE when a node is clicked and it is not a folder', () => {
      const localVue = createLocalVue()
      localVue.use(VueRouter)
      const router = new VueRouter()

      const wrapper = shallowMount(TreeMenu, {localVue, propsData, router, store})
      const node = {data: {icon: 'fa fa-table'}, model: {opened: false}}

      wrapper.vm.itemClick(node)
      td.verify(actions.FETCH_DATA_FOR_SELECTED_NODE(td.matchers.anything(), node.model, undefined))
    })
  })
})

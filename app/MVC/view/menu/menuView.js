import Marionette from 'backbone.marionette';
import template from './templates/menu-template.jst';
import store from '../../controller/appStore';
import Backbone from 'backbone';

export default Marionette.View.extend({
    template: template,
    className: 'left panel col-lg-4',
    events: {
        'click #logout' : 'logout',
        'click #main' : 'main',
        'click #transactions' : 'transactions',
    },
    triggers: {
        'click #escrow' : 'escrow:click'
    },
    initialize: function(){
        store.store.numbers.on('change', this.render, this);
    },
    templateContext: function(){
        return {
            new_msg: store.store.numbers.get('new_msg') || 0,
            active: Backbone.history.getFragment()
        }
    },
    logout: function(){
        store.clear();
        Backbone.history.navigate('/login', {trigger : true});
    },
    main: function(){
        Backbone.history.navigate('/', {trigger: true});
    },
    transactions: function(){
        Backbone.history.navigate('/transactions', {trigger: true})
    }
})
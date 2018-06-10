import Marionette from 'backbone.marionette';
import App from './App';
import workshop from './appWorkshop';
import Backbone from 'backbone';
import store from './appStore';

export default Marionette.Object.extend({
    initialize: function(){
        let app = new App();
        app.start();
        this.options.app = app;
    },
    showRoot: function(){
        if (this.loggedIn()) {
            // store.loadData().then(() => {
                store.startPolling();
                let app = this.options.app;
                app.showRoot();
            // })
        }
    },
    showLogin: function(){
        if (!workshop.getLoggedIn()) {
            let app = this.options.app;
            app.showLogin();
        } else {
            Backbone.history.navigate('/', {trigger : true});
        }
    },
    loggedIn: function(){
        if (workshop.getLoggedIn()) return true;
        else {
            Backbone.history.navigate('/login', {trigger : true});
            return false;
        }
    }
})
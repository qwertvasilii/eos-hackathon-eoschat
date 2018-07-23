import Marionette from 'backbone.marionette';
import template from './templates/tool-template.jst';
import workshop from '../../controller/appWorkshop';

export default Marionette.View.extend({
    template: template,
    className: 'right right-send col-lg-8',
    attributes: {
        id: 'tool',
        // style: 'display: none;'
    },
    onAttach: function(){
        if($(window).width() <= 991){
            this.$el.addClass('d-none');
        }
    },
    show: function(){
        this.$el.removeClass('d-none')
    },
    hide: function(){
        this.$el.addClass('d-none')
    },
    events: {
        'click #send-msg' : 'sendMsg',
        'keyup #msg-input' : 'keyup',
        'submit .send-message' : 'submit'
    },
    unblock: function(){
        this.$('#msg-input').removeAttr('disabled');
        this.$('#send-msg').removeAttr('disabled');
        this.$('#transfer').removeAttr('disabled');
    },
    block: function(){
        this.$('#msg-input').attr('disabled', 'true');
        this.$('#send-msg').attr('disabled','true');
        this.$('#transfer').attr('disabled', 'true');
    },
    sendMsg: function(){
        let self = this;
        let msg = this.$('#msg-input').val();
        if (msg) {
            $('#loading-place').html('<i class="fa fa-spinner fa-pulse fa-2x"></i>');
            this.disable();
            workshop.sendMessage(msg).then(data => {
                $('#loading-place').html('');
                self.$('#msg-input').val('');
                self.enable();
                self.$('#msg-input').focus();
            })
        }
    },
    triggers: {
        'click #transfer' : 'transfer:click'
    },
    submit: function(e){
        e.preventDefault();
        this.sendMsg()
    },
    disable: function(){
        this.$('#msg-input').attr('disabled', 'true');
        this.$('#send-msg').attr('disabled','true');
        this.$('#transfer').attr('disabled', 'true');
    },
    enable: function(){
        this.$('#msg-input').removeAttr('disabled');
        this.$('#send-msg').removeAttr('disabled');
        this.$('#transfer').removeAttr('disabled');
    }
})
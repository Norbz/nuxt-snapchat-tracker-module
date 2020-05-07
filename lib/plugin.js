/**
 * Helper Class
 */
class Snaptr {
    constructor (snaptr, options) {
      this.snaptr = snaptr
      this.options = options
    }
  
    /**
       * @method enable
       */
    enable (user = null) {
      this.init(user)
      this.track()
    }
  
    /**
       * @method init
       */
    init (user = null) {
      this.query('init', this.options.id, user)
    }
  
    /**
       * @method track
       */
    track (event = null, parameters = null) {
      if (!event) {
        event = this.options.track
      }
  
      this.query('track', event, parameters)
    }
  
    /**
       * @method query
       * @param {string} cmd
       * @param {object} option
       * @param {object} parameters
       */
    query (cmd, option, parameters = null) {
      if (!parameters) {
        this.snaptr(cmd, option)
      } else {
        this.snaptr(cmd, option, parameters)
      }
    }
  }

  

/**
 * Plugin definition
 */
export default (ctx, inject) => {
    let __snaptr

    /* eslint-disable */
    if (typeof window !== 'undefined') {
        (function(e,t,n){
            if(e.snaptr)return;
            var a=e.snaptr=function(){
                a.handleRequest?a.handleRequest.apply(a,arguments):a.queue.push(arguments)
            };
            a.queue=[];
            var s='script';
            var r=t.createElement(s);
            r.async=!0;
            r.src=n;
            var u=t.getElementsByTagName(s)[0];
            u.parentNode.insertBefore(r,u);
            
            
            __snaptr = snaptr;

            <% if (!options.disabled) { %>
            snaptr('init', '<%= options.id %>');                
            snaptr('track', '<%= options.track %>');
            <% } %>
        })(window, document, 'https://sc-static.net/scevent.min.js');
    }

    const instance = new Snaptr(__snaptr, <%= JSON.stringify(options) %>);
    /* eslint-enable */
    ctx.$snaptr = instance
    inject('snaptr', instance)
}
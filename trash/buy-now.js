(function() {
    var BNBInitScriptId = 'ferrero-bnb-init-script';
    var BNBModal;
    var BNBIframe;
    var BNBCloseBtn;
    var BNBButtons = document.getElementsByClassName('ferrero-bnb-open-widget');
    var dataset = getOriginalDataset();

    function init() {
        document.body.appendChild(createModal());
        attachEvents ();
        mediaFunction ();
    }

    function getOriginalDataset() {
        var dataset =  JSON.parse(JSON.stringify(document.getElementById(BNBInitScriptId).dataset));
        dataset['originalPath'] = window.location.href;
        if(!dataset['dir'] && document.dir){
          dataset['dir'] = document.dir;
        }
        return dataset;
    }

    function getElementDataset(element) {
      dataset = getOriginalDataset();
      var elementDataset = element.target.dataset;
      if(elementDataset){
        dataset = Object.assign(dataset, elementDataset)
      }
      return dataset;
    }

    function getCloseButtonColorFromDataset(element) {
      dataset = getElementDataset(element);
      return dataset['widgetCloseButtonColor'] ?? '#593522';
    }

    function getStaticDomain() {
      let scriptSrc = document.getElementById(BNBInitScriptId).src;
      let widgetSrc = scriptSrc.split('/');
      widgetSrc.pop();
      widgetSrc.push('widget.html')
      widgetSrc = widgetSrc.join('/');
      return widgetSrc;
    }

    function getStaticDomainWithParams() {
      let staticDomain = getStaticDomain();
      var parameters = dataset;
      var urlParameters = Object.keys(parameters).map((key) => [key, encodeURIComponent(parameters[key])].join('=')).join('&');
      return staticDomain + '?' + urlParameters;
    }

    function createModal(){
        var modal = document.createElement('div');
        modal.id = 'fererro-bnb-modal';
        modal.classList.add('ferrero-bnb-modal');
        modal.style = 'display: none; /* Hidden by default. */\n' +
            '  position: fixed; /* Stay in place. */\n' +
            '  z-index: 99999; /* Sit on top. */\n' +
            '  left: 0;\n' +
            '  top: 0;\n' +
            '  width: 100%; /* Full width */\n' +
            '  height: 100%; /* Full height */\n' +
            '  overflow: auto; /* Enable scroll if needed */\n' +
            '  background-color: rgb(0,0,0); /* Fallback color */\n' +
            '  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */\n' +
            '  -webkit-animation-name: fadeIn; /* Fade in the background */\n' +
            '  -webkit-animation-duration: 0.4s;\n' +
            '  animation-name: fadeIn;\n' +
            '  animation-duration: 0.4s';
        var modalContent = document.createElement('div');
        modalContent.id = 'fererro-bnb-modal-content';
        modalContent.classList.add('modal-content');
        modalContent.style = 'margin: 0 auto; /* 15% from the top and centered */\n' +
            '  width: 70%; /* Could be more or less, depending on screen size */' +
            '  height: 100%; /* Could be more or less, depending on screen size */';
        var modalContentInner = document.createElement('div');
        modalContentInner.id = 'fererro-bnb-modal-content-inner';
        modalContentInner.classList.add('modal-content-inner');
        modalContentInner.style = 'width: 100%; /* Full width */\n' +
            '  height: 100%; /* Full height */' +
            '  max-width: 1024px; /* Max width */' +
            '  position: relative; /* Position */' +
            '  margin: 0 auto; /* Margin */';
        var modalCloseButton = document.createElement('div');
        modalCloseButton.innerHTML = '<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="4" height="39" rx="2" transform="matrix(-0.707107 0.707107 0.707107 0.707107 2.82812 0)" fill="#593522"/><rect x="27.5781" width="4" height="39" rx="2" transform="rotate(45 27.5781 0)" fill="#593522"/></svg>';
        modalCloseButton.classList.add('modal-close-button');
        modalCloseButton.id = 'modal-close-button';
        modalCloseButton.style = 'position: absolute; /* Position */\n' +
            '  z-index: 3000; /* Z-index */' +
            '  cursor: pointer; /* cursor */';
        var iframe = createIframe();
        // modalContent.appendChild(iframe);
        modalContentInner.appendChild(iframe);
        modal.appendChild(modalContent);
        modalContent.appendChild(modalContentInner);
        modalContentInner.appendChild(modalCloseButton);
        BNBModal = modal;
        BNBCloseBtn = modalCloseButton;
        attachModalFunctions();
        return modal;
    }

    function createIframe(){
        var iframe = document.createElement('iframe');
        iframe.id = 'ferrero-bnb-modal-iframe';
        iframe.crossorigin = 'anonymous';
        iframe.referrerpolicy = 'unsafe-url';
        iframe.style = 'width: 100%;\n' +
            '  height: 100%;\n' +
            '  border: 0;\n';
        BNBIframe = iframe;
        attachIFrameFunctions();
        return iframe;
    }

    function mediaFunction() {
        var x = window.matchMedia("(max-width: 769px)");
        x.addEventListener ( 'change', checkSet ) // Attach listener function on state changes
        checkSet ();

        function checkSet () {
            if (x.matches) { // If media query matches
                document.getElementById('fererro-bnb-modal-content').style.width = '100%';
                document.getElementById('fererro-bnb-modal-content').style.height = '100%';
                document.getElementById('fererro-bnb-modal-content').style.margin = '0%';
                if (document.dir === 'rtl') {
                    document.getElementById('modal-close-button').style.left = '15px';
                    document.getElementById('modal-close-button').style.right = 'inherit';
                } else {
                    document.getElementById('modal-close-button').style.right = '15px';
                    document.getElementById('modal-close-button').style.left = 'inherit';
                }
                document.getElementById('modal-close-button').style.top = '13px';
                document.getElementById('modal-close-button').style.right = '15px';
                document.getElementById('modal-close-button').style.width = '18px';
                document.getElementById('modal-close-button').style.height = '18px';
            } else {
                document.getElementById('fererro-bnb-modal-content').style.width = '70%';
                document.getElementById('fererro-bnb-modal-content').style.height = '100%';
                document.getElementById('fererro-bnb-modal-content').style.margin = '0 auto';
                document.getElementById('modal-close-button').style.top = '50px';
                if (document.dir === 'rtl') {
                    document.getElementById('modal-close-button').style.left = '40px';
                    document.getElementById('modal-close-button').style.right = 'inherit';
                } else {
                    document.getElementById('modal-close-button').style.right = '40px';
                    document.getElementById('modal-close-button').style.left = 'inherit';
                }
                document.getElementById('modal-close-button').style.width = '30px';
                document.getElementById('modal-close-button').style.height = '30px';

            }
        } // checkSet func.
    } // mediaFunction func.

    function openModal (element){
        dataset = getElementDataset(element);
        let closeBtnRect = BNBCloseBtn.getElementsByTagName('rect');
        Array.from(closeBtnRect).forEach(function(rect) {
          rect.setAttribute('fill', getCloseButtonColorFromDataset(element));
        });

        BNBIframe.refreshSrc(getStaticDomainWithParams());
        BNBModal.open();
    }

    function attachEvents(){
        // Close modal if you click outside
        window.onclick = function(event) {
            if (event.target == BNBModal) {
                BNBModal.close();
            }
        }

        // Close modal if you click Modal close button
        var closeButton = document.getElementsByClassName ('modal-close-button')[0];
        closeButton.addEventListener('click', () => {
                            BNBModal.close();
                })

        // Attach click event on BNB buttons
        Array.from(BNBButtons).forEach(function(element) {
            element.addEventListener('click', openModal);
        });
    }

    function attachIFrameFunctions(){
        BNBIframe.refreshSrc = function (src){
          if (BNBIframe.src != src) {
            BNBIframe.src = src;
          }
        };
    }

    function attachModalFunctions(){
        BNBModal.open = function (){
            BNBModal.style.display = "block";
        }
        BNBModal.close = function (){
            BNBIframe.refreshSrc('');
            BNBModal.style.display = "none";
        }
    }

    if(dataset['instantInit']){
      init();
    }
    else{
      document.addEventListener('DOMContentLoaded', (event) => {
        init();
      })
    }
})();

function holder() {
  console.log("holder triggered");
}

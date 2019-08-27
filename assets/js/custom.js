(function(){
    var DefaultForms = { 
        
        defaults: {
            //CONFIGURATIONS
            EL: 'default-form',
            CAPTATION: null,

            //ELEMENTOS
            FORM_CLIENT_NAME: null,
            FORM_SERVICE: null,
            FORM_PRODUCT: null,
            FORM_MESSAGE: null,
        },

        messages: {
            submit: {
                required: "O botão SUBMIT é obrigatório!"
            },

            captation:{
                required: "A captação é obrigatória"
            }
        },
        

        init: function () {
            let self = this;
            let forms = document.getElementsByClassName(self.defaults.EL);

            this.validateForms(forms);
            this.addSubmitEvent(forms);
            // for(let el of elements){
            //     console.log(el);
            // }
            console.log("Tarefas Finalizadas...")
        },

        validateForms: function(forms){
            for(var form of forms){
                
                let submit = form.querySelector('button[type="submit"]');
                let captation = form.querySelector('input[name="MEIO_CAPTACAO"]');

                if( submit === null ){
                    throw new Error(this.messages.submit.required);
                }
                
                if(captation === null){
                    throw new Error(this.messages.captation.required);
                }
            }
        },

        addSubmitEvent: function(forms){
            let self = this;
            for(let form of forms){
                form.addEventListener("submit", function(e){
                    let phoneDestiny = form.querySelector('input[name="PHONE_DESTINY"]').value;
                    let captation = form.querySelector('input[name="MEIO_CAPTACAO"]').value; 
                    if(captation.search("form-whatsapp") != -1){
                        let message = self.createCustomMessage(form)
                        e.preventDefault();
                        window.location.href = "https://api.whatsapp.com/send?phone=" + phoneDestiny + "&text=" + message;
                    }

                });
            }
        },

        createCustomMessage: function(form){
            let self = this;
            let buffer = "";
            var message = "";

            self.defaults.CAPTATION = form.querySelector('input[name="MEIO_CAPTACAO"]') == null ? null : form.querySelector('input[name="MEIO_CAPTACAO"]').value;

            self.defaults.FORM_CLIENT_NAME = form.querySelector('input[name="NAME"]') == null ? null : form.querySelector('input[name="NAME"]').value;
            self.defaults.FORM_PRODUCT = form.querySelector('SELECT[name="PRODUCT"]') == null ? null : form.querySelector('SELECT[name="PRODUCT"]').value;
            self.defaults.FORM_SERVICE = form.querySelector('SELECT[name="SERVICE"]') == null ? null : form.querySelector('SELECT[name="SERVICE"]').value;         
            self.defaults.FORM_MESSAGE = form.querySelector('input[name="MESSAGE"]') == null ? null : form.querySelector('input[name="MESSAGE"]').value;
            
            message += this.messageAddName(self.defaults.FORM_CLIENT_NAME);
            message += this.messageAddProduct(self.defaults.FORM_PRODUCT);
            message += this.messageAddServices(self.defaults.FORM_SERVICE);

            return message;
        },

        messageAddName: function(name){
           return "Olá meu nome é " + name + " e preciso de algunas informações. ";
        },

        messageAddProduct: function(product){
            if(product != null){
                return "Eu escolhi no site o produto " + product + ", poderia me ajudar?";
            }
            return "";
        },

        messageAddServices: function(service){
            if(service != null){
                return "Eu escolhi no site o serviço " + service + ", poderia me ajudar?";
            }
            return "";
        }

    }
    console.log("Iniciando tarefas...")
    return DefaultForms.init();
}())
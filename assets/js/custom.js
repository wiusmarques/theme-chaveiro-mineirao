(function(){
    var DefaultForms = { 
        
        defaults: {
            EL: 'default-form'
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
            var self = this;
            var forms = document.getElementsByClassName(self.defaults.EL);

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
            for(let form of forms){
                form.addEventListener("submit", function(e){
                    let captation = form.querySelector('input[name="MEIO_CAPTACAO"]').value;
                    let phoneDestiny = form.querySelector('input[name="PHONE_DESTINY"]').value;
                    let message = form.querySelector('input[name="MESSAGE"]').value;
                    if(captation.search("form-whatsapp") != -1){
                        console.log("Deu bom demais");
                        e.preventDefault();
                        window.location.href = "https://api.whatsapp.com/send?phone=" + phoneDestiny + "&text=" + message;
                    }else{
                        console.log("Nada acontece ajuara!");
                    }

                });
            }
        },

    }
    console.log("Iniciando tarefas...")
    return DefaultForms.init();
}())
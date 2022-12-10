$(document).ready(function () {
    var user = [];
    var activity = [];
    var subject = []

    var dados = {
        "user": user,
        "new_user": { name: "", email: "", password: "", confirmPassword: "", city: "", state: "" },
        "login": { email: "", password: "" },
        "activity": activity,
        "new_activity": { name: "", deadline: "", subject: {} },
        "subject": subject,
        "new_subject": { name: "", teacher: "" }
    }

    Vue.prototype.$http = axios;

    // global
    Vue.use(window.vuelidate.default);

    const { required, maxLength, minValue, numeric } = window.validators

    new Vue({
        el: '#app',
        data: dados,
        validations: {
            login: {
                email: {
                    required
                },
                password: {
                    required,
                    minValue: minValue(6)
                }
            }
        },
        methods: {
            login: function (v) {
                
            }
        }
    })
});
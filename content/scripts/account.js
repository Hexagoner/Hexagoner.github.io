var signUp = {
    init: function ()
    {
        var self = this;

        $("#signUpForm1").validate({
            rules: {
                imei: {
                    required: true
                },
                securityToken: {
                    required: true,
                    minlength: 10
                }
            },
            submitHandler: function (form)
            {
                var imei = $("#imei").val();
                var authenticationCode = $("#authenticationCode").val();

                $.ajax({
                        url: app.urls.validateDevice,
                        type: "post",
                        data: { imei : imei, authenticationCode : authenticationCode },
                    success: function (response)
                    {
                        $("#signUp1").hide();
                        $("#signUp2").show();
                    }
                });
            }
        });

        $("#signUpForm2").validate({
            rules: {
                email: {
                    required: true
                },
                password: {
                    required: true
                }
            },
            submitHandler: function (form)
            {
                self.createUser();
                return false;
            }
        });

        $("#signUpNext").click(function () {
            $("#signUpForm1").submit();
        });

        $("#signUpWithEmail").click(function () {
            $("#signUpForm2").submit();
            return false;
        });
    },
    createUser : function()
    {
        var email = $("#signUpEmail").val();
        var password = $("#signUpPassword").val();

        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(function(result) {
                // alert(JSON.stringify(result));
                
                var uid = result.uid;
                var token = result._lat;

                $.ajax({
                    url: app.urls.signUp,
                    type: "post",
                    data: { uid, token },
                    success: function (response) {
                        alert(JSON.stringify(response));
                    }
                });

            })
            .catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(errorCode);
                alert(errorMessage);
            });
    }

}

var signIn = {
    init: function () {
        this.initGoogleLogin();
        this.initFacebookLogin();
        this.initTwitterLogin();
        this.initEmailLogin();
    },
    initGoogleLogin: function () {
        var self = this;

        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/plus.login');

        $("#googleLogin").click(function () {

            $("#loginFailedMsg").hide();

            firebase.auth().signInWithPopup(provider).then(function (result) {
                
                var token = result.credential.accessToken;
                var uid = result.user.uid;

                self.signIn(uid, token);

            }).catch(function (error) {

                // Todo: Log error message?
                $("#loginFailedMsg").show();
            });
        });
    },
    initFacebookLogin: function () {
        var self = this;

        var provider = new firebase.auth.FacebookAuthProvider();
        provider.addScope('user_birthday');

        $("#facebookLogin").click(function () {

            $("#loginFailedMsg").hide();

            firebase.auth().signInWithPopup(provider).then(function (result) {

                var token = result.credential.accessToken;
                var uid = result.user.uid;

                self.signIn(uid, token);

            }).catch(function (error) {

                //Todo: Log error message?
                $("#loginFailedMsg").show();
            });

        });
    },
    initTwitterLogin: function () {
        var self = this;

        var provider = new firebase.auth.TwitterAuthProvider();

        $("#twitterLogin").click(function () {

                $("#loginFailedMsg").hide();

                firebase.auth()
                    .signInWithPopup(provider)
                    .then(function (result) {

                        var token = result.credential.accessToken;
                        var uid = result.user.uid;

                        self.signIn(uid, token);
                    })
                    .catch(function (error) {

                        //Todo: Log error message?
                        $("#loginFailedMsg").show();
                    });

            });
    },
    initEmailLogin: function ()
    {
        var self = this;

        $("#emailLogin")
        .click(function () {
            $("#loginFailedMsg").hide();

            var email = $("#email").val();
            var password = $("#password").val();

            firebase.auth().signInWithEmailAndPassword(email, password)
                .then(function (result) {
                    // alert(JSON.stringify(result));

                    var token = result._lat;
                    var uid = result.uid;
                    self.signIn(uid, token);

                })
                .catch(function (error) {

                    // TODO: handle error messages
                    $("#loginFailedMsg").show();
                });

            return false;
        });
    },
    signIn: function (uid, token) {

        $("#uid").val(uid);
        $("#authToken").val(token);

        $("#signInForm").submit();
    }
}
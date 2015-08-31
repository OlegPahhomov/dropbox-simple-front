var serverConfig = {

    //reconfig this to return base server
    SERVER: function () {
        return this.LEIN_RING_SERVER();
    },

    url: function (url) {
        return serverConfig.SERVER() + url
    },

    //define here elements
    LOCALHOST: "http://localhost:",
    XXX_SERVER: "some-external-url",
    SPARK_PORT: "4567/",
    JETTY_PORT: "8080/",
    LEIN_RING_SERVER_PORT: "3000/",
    SPRING_BOOT_PORT: "8080/",
    SPARK: function () {
        return (this.LOCALHOST + this.SPARK_PORT)
    },
    JETTY: function () {
        return (this.LOCALHOST + this.JETTY_PORT)
    },
    LEIN_RING_SERVER: function () {
        return (this.LOCALHOST + this.LEIN_RING_SERVER_PORT)
    },
    SPRING_BOOT: function () {
        return (this.LOCALHOST + this.SPRING_BOOT_PORT)
    }
}

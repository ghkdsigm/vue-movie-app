<template>
    <div class="not-found">
        <div class="status">
            404
        </div>
        <div class="message">
            Page Not Found!
        </div>
        <button>
            <a href="#/">To Home</a>
        </button>
    </div>
</template>

<style lang="scss" scoped>

.not-found{
    line-height: 1.2;
    text-align: center;
    font-family: "Oswald", sans-serif;
    padding:80px 20px;
    .status{
        font-size:160px;
        color: $primary;
    }
    .message{
        font-size:50px;
    }
    button {
        margin-top:25px;
        border:1px solid rgb(93, 93, 93);
        background-color:transparent;
        padding:5px 15px;
        color:$black;
    }
}
</style>
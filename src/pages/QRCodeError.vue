<template>
    <div class="fullscreen bg-white text-dark text-center q-pa-md flex flex-center">
        <div>
            <div class="text-center">
                <q-img
                    src="/web_hi_res_512.png"
                    width="50vmin"
                    class="rounded-borders shadow-1"
                ></q-img>

                <div class="text-center q-ma-md text-h5">humbleShit</div>
            </div>
            <div class="text-h5" style="opacity:.4">
                QR Code is not active currently. Sorry for the inconvenience caused.
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'QRCodeError'
}
</script>

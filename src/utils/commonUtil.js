import JSEncrypt from "jsencrypt"

export default {
  encodeRSA(word, keyStr) {
    //这个是公钥,有入参时用入参，没有入参用默认公钥
    keyStr = keyStr ? keyStr : 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCEGx1Sc0/JKYpE6QyEEncrUERIzHA3Z8PRHrdR' +
    'vdP8MpKTNDfOxivNkuLNhcI/9HwJJWdfrMZfh9oq1h+ObOZRIdBa1rxHcYTV/F5F/fvdh1/I/GLu' +
    'A3Z/jqAHHEDORKNtAaw3NHs0pFHDPzRRqsyF5ryDGHf58bGleNGCLBJmbwIDAQAB'   
    //创建对象
    const jsRsa = new JSEncrypt()
    //设置公钥
    jsRsa.setPublicKey(keyStr)
    //返回加密后结果
    var result = jsRsa.encrypt(word)
    return result
  }

}

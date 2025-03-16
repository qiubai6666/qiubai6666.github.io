







function ne73660dd3843ccf8320cb220913c9ba2(message) {
    message = unescape(encodeURIComponent(message));

    function rotateLeft(lValue, iShiftBits) {
        return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
    }

    function addUnsigned(lX, lY) {
        var lX4, lY4, lX8, lY8, lResult;
        lX8 = (lX & 0x80000000);
        lY8 = (lY & 0x80000000);
        lX4 = (lX & 0x40000000);
        lY4 = (lY & 0x40000000);
        lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
        if (lX4 & lY4) {
            return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
        }
        if (lX4 | lY4) {
            if (lResult & 0x40000000) {
                return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
            } else {
                return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
            }
        } else {
            return (lResult ^ lX8 ^ lY8);
        }
    }

    function F(x, y, z) {
        return (x & y) | ((~x) & z);
    }

    function G(x, y, z) {
        return (x & z) | (y & (~z));
    }

    function H(x, y, z) {
        return (x ^ y ^ z);
    }

    function I(x, y, z) {
        return (y ^ (x | (~z)));
    }

    function FF(a, b, c, d, x, s, ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(F(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
    }

    function GG(a, b, c, d, x, s, ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(G(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
    }

    function HH(a, b, c, d, x, s, ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(H(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
    }

    function II(a, b, c, d, x, s, ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(I(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
    }

    function convertToWordArray(message) {
        var lWordCount, lMessageLength = message.length,
            lNumberOfWords_temp1 = lMessageLength + 8,
            lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64,
            lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16,
            lWordArray = new Array(lNumberOfWords);
        for (lWordCount = 0; lWordCount < lNumberOfWords; lWordCount++) {
            lWordArray[lWordCount] = 0;
        }
        for (lWordCount = 0; lWordCount < lMessageLength; lWordCount++) {
            lWordArray[lWordCount >> 2] |= message.charCodeAt(lWordCount) << ((lWordCount % 4) * 8);
        }
        lWordArray[lWordCount >> 2] |= 0x80 << ((lWordCount % 4) * 8);
        lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
        lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
        return lWordArray;
    }

    function wordToHex(lValue) {
        var wordToHexValue = '',
            wordToHexValue_temp = '',
            lByte, lCount;
        for (lCount = 0; lCount <= 3; lCount++) {
            lByte = (lValue >>> (lCount * 8)) & 255;
            wordToHexValue_temp = '0' + lByte.toString(16);
            wordToHexValue += wordToHexValue_temp.substr(wordToHexValue_temp.length - 2, 2);
        }
        return wordToHexValue;
    }
    var x = [],
        k, AA, BB, CC, DD, a, b, c, d, S11 = 7,
        S12 = 12,
        S13 = 17,
        S14 = 22,
        S21 = 5,
        S22 = 9,
        S23 = 14,
        S24 = 20,
        S31 = 4,
        S32 = 11,
        S33 = 16,
        S34 = 23,
        S41 = 6,
        S42 = 10,
        S43 = 15,
        S44 = 21;
    x = convertToWordArray(message);
    a = 0x67452301;
    b = 0xEFCDAB89;
    c = 0x98BADCFE;
    d = 0x10325476;
    for (k = 0; k < x.length; k += 16) {
        AA = a;
        BB = b;
        CC = c;
        DD = d;
        a = FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
        d = FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
        c = FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
        b = FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
        a = FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
        d = FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
        c = FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
        b = FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
        a = FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
        d = FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
        c = FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
        b = FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
        a = FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
        d = FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
        c = FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
        b = FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
        a = GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
        d = GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
        c = GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
        b = GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
        a = GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
        d = GG(d, a, b, c, x[k + 10], S22, 0x2441453);
        c = GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
        b = GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
        a = GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
        d = GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
        c = GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
        b = GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
        a = GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
        d = GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
        c = GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
        b = GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
        a = HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
        d = HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
        c = HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
        b = HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
        a = HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
        d = HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
        c = HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
        b = HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
        a = HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
        d = HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
        c = HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
        b = HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
        a = HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
        d = HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
        c = HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
        b = HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
        a = II(a, b, c, d, x[k + 0], S41, 0xF4292244);
        d = II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
        c = II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
        b = II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
        a = II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
        d = II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
        c = II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
        b = II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
        a = II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
        d = II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
        c = II(c, d, a, b, x[k + 6], S43, 0xA3014314);
        b = II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
        a = II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
        d = II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
        c = II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
        b = II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
        a = addUnsigned(a, AA);
        b = addUnsigned(b, BB);
        c = addUnsigned(c, CC);
        d = addUnsigned(d, DD);
    }
    var temp = wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d);
    return temp.toLowerCase();
}

function s4504a7b4893d41ec07dbc81599edc96c(text, key) {
    text = utf8Encode(text);
    key = utf8Encode(key);

    let s = new Array(256);
    let j = 0;
    let x;

    for (let i = 0; i < 256; i++) {
        s[i] = i;
    }

    for (let i = 0; i < 256; i++) {
        j = (j + s[i] + key.charCodeAt(i % key.length)) % 256;
        x = s[i];
        s[i] = s[j];
        s[j] = x;
    }

    let i = 0;
    j = 0;
    let ciphertext = '';

    for (let n = 0; n < text.length; n++) {
        i = (i + 1) % 256;
        j = (j + s[i]) % 256;
        x = s[i];
        s[i] = s[j];
        s[j] = x;
        ciphertext += String.fromCharCode(text.charCodeAt(n) ^ s[(s[i] + s[j]) % 256]);
    }

    return ciphertext;
}

function g295fab631122bf0319b87b2da012386f(ciphertext, key) {
    ciphertext = ciphertext;
    key = utf8Encode(key);

    let s = new Array(256);
    let j = 0;
    let x;

    for (let i = 0; i < 256; i++) {
        s[i] = i;
    }

    for (let i = 0; i < 256; i++) {
        j = (j + s[i] + key.charCodeAt(i % key.length)) % 256;
        x = s[i];
        s[i] = s[j];
        s[j] = x;
    }

    let i = 0;
    j = 0;
    let plaintext = '';

    for (let n = 0; n < ciphertext.length; n++) {
        i = (i + 1) % 256;
        j = (j + s[i]) % 256;
        x = s[i];
        s[i] = s[j];
        s[j] = x;
        plaintext += String.fromCharCode(ciphertext.charCodeAt(n) ^ s[(s[i] + s[j]) % 256]);
    }

    return utf8Decode(plaintext);
}

function utf8Encode(str) {
    return unescape(encodeURIComponent(str));
}

function utf8Decode(str) {
    return decodeURIComponent(escape(str));
}

function od2ea933b2c6a6e1d733187ace814bee4(hex) {
    let bytes = [];
    for (let i = 0; i < hex.length - 1; i += 2) {
        bytes.push(parseInt(hex.substr(i, 2), 16));
    }
    return String.fromCharCode.apply(String, bytes);
}

function ia4bd26545bb9ff5db92451015f7461b3(bin) {
    let hex = '';
    for (let i = 0; i < bin.length; i++) {
        hex += ('0' + bin.charCodeAt(i)
            .toString(16))
            .slice(-2);
    }
    return hex;
}

const customBase64Key = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
function qfa194877a00a92b35a7919a6e43325ee(input) {
    const utf8String = unescape(encodeURIComponent(input));
    const base64 = btoa(utf8String);
    return base64.replace(/[A-Za-z0-9+/]/g, char => customBase64Key[customBase64Key.indexOf(char)]);
}

function n6ee51126d6e8875d6824d2834b5cd795(input) {
    const base64 = input.replace(/[A-Za-z0-9+/]/g, char => customBase64Key[customBase64Key.indexOf(char)]);
    const utf8String = atob(base64);
    return decodeURIComponent(escape(utf8String));
}

function r5e2b3c2b9a12646e858cbd94d8455c07(input, base64Chars) {
  // Convert input string to UTF-8 bytes
  const utf8Bytes = new TextEncoder().encode(input);
  
  let output = "";
  let padding = "";
  let i = 0;
  const len = utf8Bytes.length;

  while (i < len) {
    let b1 = utf8Bytes[i];
    let b2 = utf8Bytes[i + 1];
    let b3 = utf8Bytes[i + 2];

    if (b2 === undefined) {
      b2 = 0;
      padding += "=";
    }
    if (b3 === undefined) {
      b3 = 0;
      padding += "=";
    }

    let combined = (b1 << 16) + (b2 << 8) + b3;
    output += base64Chars.charAt((combined >> 18) & 0x3F);
    output += base64Chars.charAt((combined >> 12) & 0x3F);
    output += base64Chars.charAt((combined >> 6) & 0x3F);
    output += base64Chars.charAt(combined & 0x3F);

    i += 3;
  }

  return output.substring(0, output.length - padding.length) + padding;
}

function h084635cda96835042cf5b98b92f6643c(input, base64Chars) {
  const base64DecodeChars = {};
  for (let i = 0; i < base64Chars.length; i++) {
    base64DecodeChars[base64Chars.charAt(i)] = i;
  }

  let padding = 0;
  if (input.endsWith("=")) padding++;
  if (input.endsWith("==")) padding++;

  let output = [];
  let i = 0;
  const len = input.length;

  while (i < len - padding) {
    let c1 = base64DecodeChars[input.charAt(i)];
    let c2 = base64DecodeChars[input.charAt(i + 1)];
    let c3 = base64DecodeChars[input.charAt(i + 2)];
    let c4 = base64DecodeChars[input.charAt(i + 3)];

    if (c3 === undefined) c3 = 0;
    if (c4 === undefined) c4 = 0;

    let combined = (c1 << 18) + (c2 << 12) + (c3 << 6) + c4;
    output.push((combined >> 16) & 0xFF);
    output.push((combined >> 8) & 0xFF);
    output.push(combined & 0xFF);

    i += 4;
  }

  // Trim padding
  if (padding === 1) {
    output = output.slice(0, -1);
  } else if (padding === 2) {
    output = output.slice(0, -2);
  }

  // Convert bytes back to string (UTF-8)
  return new TextDecoder().decode(new Uint8Array(output));
}

function geyKamiHc(){
    var kami = localStorage.getItem('weiyanKami');
    return kami == null ? "" : kami
}

function getDeviceId() {
    var deviceId = localStorage.getItem('deviceId');
    if (!deviceId) {
        deviceId = generateDeviceId();
        localStorage.setItem('deviceId', deviceId);
    }
    return deviceId;
}

function generateDeviceId() {
    var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var deviceId = '';
    for (var i = 0; i < 16; i++) {
        deviceId += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return deviceId;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function wyDateTime(timestamp) {
    const date = new Date(timestamp * 1000);
    return date.toLocaleString();
}

function HttpPost(url, data, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        callback(null, xhr.responseText);
      } else {
        callback(xhr.status, null);
      }
    }
  };
  xhr.send(data);
}


const p6e8e3ea7ab3d309dd5364b44211509d3 = "https://wy.llua.cn/v2/"

// 系统公告
HttpPost(p6e8e3ea7ab3d309dd5364b44211509d3 + "018df4bf54b57a25c7205b284953d98b",qfa194877a00a92b35a7919a6e43325ee(ia4bd26545bb9ff5db92451015f7461b3(qfa194877a00a92b35a7919a6e43325ee(ia4bd26545bb9ff5db92451015f7461b3(s4504a7b4893d41ec07dbc81599edc96c(r5e2b3c2b9a12646e858cbd94d8455c07(ia4bd26545bb9ff5db92451015f7461b3(s4504a7b4893d41ec07dbc81599edc96c(ia4bd26545bb9ff5db92451015f7461b3(ia4bd26545bb9ff5db92451015f7461b3(s4504a7b4893d41ec07dbc81599edc96c("id=297ITX53i2R","kea79e86d824001c4e83dc1642fc30197ad78"))),"lc9d20d3aec0da01f37024d2f")),"Cnj2bxYRSyiQH7WmMIcOaeGET4zkvBg0rZ3NF+DXUuhfpPLwlVAq56/9dsJotK18"),"j7d2cbe3d837e4098d2c8910ec367e6ca"))))),function(code,data){
    if (code) {
        confirm("请求失败，状态码：" + error);
    } else {
        const notice_data = JSON.parse(g295fab631122bf0319b87b2da012386f(od2ea933b2c6a6e1d733187ace814bee4(data),"w3866c65c58c631409239"))
        if (notice_data.code == 67340) {
            confirm("公告：" + notice_data.msg.app_gg)
        } else {
            confirm("公告获取失败")
        }
        q794af5ef9a3d1144c6dc47a9e788344a()
    }
})

// 单码登录
function q794af5ef9a3d1144c6dc47a9e788344a(){
    const l2a6369f359e29e8d49e0a47a651e2e47 = prompt("请输入卡密",geyKamiHc())
    const h08b9b5d5e7f75974f57e3c1774240e7d = getDeviceId()
    const odcc0ac5b6de3b545b893b931794d1da5 = Math.floor(new Date().getTime() / 1000);
    const kd938024870de3fdef8415327764a77fa = getRandomInt(10000, 99999);
    const dfe10ef29a4b2a33d0d98baf6781c3f31 = ne73660dd3843ccf8320cb220913c9ba2("kami=" + l2a6369f359e29e8d49e0a47a651e2e47 + "&markcode=" + h08b9b5d5e7f75974f57e3c1774240e7d + "&t=" + odcc0ac5b6de3b545b893b931794d1da5 + "&l411cc09157e1892e6fd41a855222b75")
    HttpPost(p6e8e3ea7ab3d309dd5364b44211509d3 + "018df4bf54b57a25c7205b284953d98b",qfa194877a00a92b35a7919a6e43325ee(ia4bd26545bb9ff5db92451015f7461b3(qfa194877a00a92b35a7919a6e43325ee(ia4bd26545bb9ff5db92451015f7461b3(s4504a7b4893d41ec07dbc81599edc96c(r5e2b3c2b9a12646e858cbd94d8455c07(ia4bd26545bb9ff5db92451015f7461b3(s4504a7b4893d41ec07dbc81599edc96c(ia4bd26545bb9ff5db92451015f7461b3(ia4bd26545bb9ff5db92451015f7461b3(s4504a7b4893d41ec07dbc81599edc96c("id=n2ttaQAGqnH&kami=" + l2a6369f359e29e8d49e0a47a651e2e47 + "&markcode=" + h08b9b5d5e7f75974f57e3c1774240e7d + "&t=" + odcc0ac5b6de3b545b893b931794d1da5 + "&sign=" + dfe10ef29a4b2a33d0d98baf6781c3f31 + "&value=" + kd938024870de3fdef8415327764a77fa +"","kea79e86d824001c4e83dc1642fc30197ad78"))),"lc9d20d3aec0da01f37024d2f")),"Cnj2bxYRSyiQH7WmMIcOaeGET4zkvBg0rZ3NF+DXUuhfpPLwlVAq56/9dsJotK18"),"j7d2cbe3d837e4098d2c8910ec367e6ca"))))),function(code,d8362323b2282f5476fcfa69937192a60){
        if (code) {
            confirm("请求失败，状态码：" + code);
        } else {
            const yb0e53b868cae0a7c133604b21083bfb1 = JSON.parse(h084635cda96835042cf5b98b92f6643c(h084635cda96835042cf5b98b92f6643c(n6ee51126d6e8875d6824d2834b5cd795(n6ee51126d6e8875d6824d2834b5cd795(n6ee51126d6e8875d6824d2834b5cd795(g295fab631122bf0319b87b2da012386f(od2ea933b2c6a6e1d733187ace814bee4(d8362323b2282f5476fcfa69937192a60),"zab0210dba6da8b6aa5ba981d0f")))),"AmM18ah5b7GFHS3wQVKOkNCYJXgUlZe2Lj/W4D6t+pcERisvrP9fyqBIxdnozT0u"),"FgMGhf6aOidQK/ZYPHbvrxCjXLokpB5smR8D1+yWVAuJU9cq274EIT3SnNw0tlze"))
            if (yb0e53b868cae0a7c133604b21083bfb1.q3d3c9cca5cf96f80f6aabeafb39182fa==99367 && yb0e53b868cae0a7c133604b21083bfb1.n1542772276581eef2d24efd1e67ec325.we059c1e4f91e6758a39132dfe20ce36d=="9dd8b14894862085b78a90c832ee8e82"){
                if (yb0e53b868cae0a7c133604b21083bfb1.t6f305fcc83fdd6b6233b55bea74f2b97-odcc0ac5b6de3b545b893b931794d1da5>30 || yb0e53b868cae0a7c133604b21083bfb1.t6f305fcc83fdd6b6233b55bea74f2b97-odcc0ac5b6de3b545b893b931794d1da5<-30){
                    confirm("设备时间不准")
                }else{
                    if (yb0e53b868cae0a7c133604b21083bfb1.n1542772276581eef2d24efd1e67ec325.h34a4e69c69ef545d4a != ne73660dd3843ccf8320cb220913c9ba2(""+yb0e53b868cae0a7c133604b21083bfb1.q3d3c9cca5cf96f80f6aabeafb39182fa+""+yb0e53b868cae0a7c133604b21083bfb1.n1542772276581eef2d24efd1e67ec325.oe3177b15581fd81d8ac4bf933d818605+""+dfe10ef29a4b2a33d0d98baf6781c3f31+""+yb0e53b868cae0a7c133604b21083bfb1.t6f305fcc83fdd6b6233b55bea74f2b97+"n08cc") || yb0e53b868cae0a7c133604b21083bfb1.n1542772276581eef2d24efd1e67ec325.j4aa7e94439ac != ne73660dd3843ccf8320cb220913c9ba2(""+yb0e53b868cae0a7c133604b21083bfb1.t6f305fcc83fdd6b6233b55bea74f2b97+""+"l411cc09157e1892e6fd41a855222b75"+""+"l411cc09157e1892e6fd41a855222b75"+""+yb0e53b868cae0a7c133604b21083bfb1.q3d3c9cca5cf96f80f6aabeafb39182fa+"m68c8") || yb0e53b868cae0a7c133604b21083bfb1.n1542772276581eef2d24efd1e67ec325.w614d976c24 != ne73660dd3843ccf8320cb220913c9ba2(""+dfe10ef29a4b2a33d0d98baf6781c3f31+""+yb0e53b868cae0a7c133604b21083bfb1.q3d3c9cca5cf96f80f6aabeafb39182fa+""+"l411cc09157e1892e6fd41a855222b75"+""+odcc0ac5b6de3b545b893b931794d1da5+"e188c62a4")){
                        confirm("校验失败")
                    }else{
                        if (yb0e53b868cae0a7c133604b21083bfb1.n1542772276581eef2d24efd1e67ec325.dd7d24aea7e4a06ba46733702c647b721 == "single"){
                            confirm("登录成功\n剩余登录次数:" + yb0e53b868cae0a7c133604b21083bfb1.n1542772276581eef2d24efd1e67ec325.a4170517f5e6a513716ae52ff0ed6f0e8)
                        }else{
                            confirm("登录成功\n到期时间:" + wyDateTime(yb0e53b868cae0a7c133604b21083bfb1.n1542772276581eef2d24efd1e67ec325.u254312cd52efc352aabaeafa9a43cd1c))
                        }
                        document.body.style.display = "block";
                        localStorage.setItem('weiyanKami', l2a6369f359e29e8d49e0a47a651e2e47);
                        return
                    }
                }
            }else{
                confirm(yb0e53b868cae0a7c133604b21083bfb1.n1542772276581eef2d24efd1e67ec325)
            }
        
        }
        q794af5ef9a3d1144c6dc47a9e788344a()
    })
}



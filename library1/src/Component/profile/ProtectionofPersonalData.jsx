import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function ProtectionofPersonalData() {
    return (
        <SafeAreaView style={{ paddingHorizontal: 33, backgroundColor: "white" }}>
            <ScrollView style={{ backgroundColor: "white", height: "100%" }}>
                <Text style={{ fontWeight: "bold", fontSize: 18 }}>Gizlilik ve Güvenlik Bildirimi</Text>
                <Text>

                    Gizlilik ve güvenlik, [Proje Adı] Kütüphane Otomasyon Sistemi için en üst düzeyde önceliklidir. Bu bildiri, sistemimizin nasıl kişisel verilerinizi topladığını, kullandığını, paylaştığını ve koruduğunu açıklamaktadır.

                </Text>
                <Text style={{ fontWeight: "bold" }}>Toplanan Kişisel Veriler:</Text>
                <Text>
                    - İsim {"\n"}


                    - E-posta adresi {"\n"}

                    - Kullanıcı tarafından sağlanan diğer bilgiler (tercih edilen kitap türleri, okuma alışkanlıkları vb.)
                </Text>
                <Text style={{ fontWeight: "bold" }}>Kişisel Verilerin Kullanımı:</Text>
                <Text>

                    - Kullanıcıların kütüphane hizmetlerinden faydalanabilmesi için iletişim kurmak. {"\n"}
                    - Kullanıcıların tercihlerine göre kitap önerileri sunmak. {"\n"}
                    - Kütüphane hizmetlerinin geliştirilmesi için anonimleştirilmiş verilerin kullanılması.
                </Text>
                <Text style={{ fontWeight: "bold" }}>Kişisel Verilerin Paylaşımı:</Text>
                <Text>
                    - Üçüncü taraf hizmet sağlayıcılarımızla (örneğin, bulut barındırma sağlayıcıları) kişisel veri paylaşımı. {"\n"}
                    - Yürürlükteki yasal düzenlemeler gerektirdiğinde resmi kurumlarla kişisel veri paylaşımı.
                </Text>
                <Text style={{ fontWeight: "bold" }}>Kişisel Veri Güvenliği:</Text>
                <Text>
                    - Verilerin yetkisiz erişim, değişiklik ve silinmelere karşı korunması için güvenlik önlemleri alınmaktadır. {"\n"}
                    - Verilerin şifrelenmesi ve güvenli sunucularda saklanması. {"\n"}
                    - Personelin gizlilik politikaları ve veri koruma prosedürleri konusunda eğitilmesi.
                </Text>
                <Text style={{ fontWeight: "bold" }}>Kullanıcı Hakları:</Text>
                <Text>
                    - Kullanıcılar, kişisel verilerine erişim, düzeltme, silme ve taşıma gibi haklara sahiptir. {"\n"}
                    - Kullanıcılar, kişisel verilerinin nasıl işlendiği konusunda bilgi talep edebilirler.
                </Text>
                <Text>
                    Bu kişisel veri koruma bildirimi, [Proje Adı] Kütüphane Otomasyon Sistemi'nin kullanıcılarının gizliliğini koruma taahhüdünün bir parçasıdır. Sistemimizin gizlilik politikaları ve uygulamaları zaman zaman güncellenebilir, bu nedenle kullanıcılarımızın periyodik olarak güncellemeleri kontrol etmeleri önerilir.
                </Text>
                <Text>
                    Herhangi bir sorunuz veya endişeniz varsa, lütfen bize fratyldrmm7@gmail.com üzerinden ulaşın.
                </Text>
                <Text>
                    Saygılarımızla, [Şirket/Proje Adı] Ekibi
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
}

export default ProtectionofPersonalData;

import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function ConfidentialityAgreement() {
    return (
        <SafeAreaView style={{ paddingHorizontal: 33, backgroundColor: "white" }}>
            <ScrollView style={{ backgroundColor: "white", height: "100%" }}>
                <Text style={{ fontWeight: "bold", fontSize: 18, marginBottom: 12 }}>Gizlilik Sözleşmesi</Text>
                <Text>
                    Bu Gizlilik Sözleşmesi sağlanan hizmetlerden yararlanan herkes için geçerlidir.
                </Text>
                <Text>
                    **1. Kişisel Verilerin Toplanması ve Kullanılması:**
                </Text>
                <Text>
                    - Platformun kullanımı sırasında, belirli kişisel bilgiler (ad, e-posta adresi, vb.) otomatik olarak toplanabilir. Bu bilgiler, hizmetlerin sağlanması, kullanıcı deneyiminin iyileştirilmesi ve gerektiğinde iletişim kurulması için kullanılabilir.
                </Text>
                <Text>
                    **2. Kişisel Verilerin Korunması:**
                </Text>
                <Text>
                    - Toplanan kişisel veriler, gizlilik ve güvenlik önlemleri alınarak korunur. Bu veriler, üçüncü taraflarla paylaşılmaz veya satılmaz.
                </Text>
                <Text>
                    **3. Çerezler:**
                </Text>
                <Text>
                    - Platform, çerezler aracılığıyla kullanıcıların tarayıcı bilgilerini alabilir. Bu bilgiler, kullanıcıların tercihlerini hatırlamak ve hizmetleri iyileştirmek için kullanılabilir.
                </Text>
                <Text>
                    **4. Üçüncü Taraf Bağlantıları:**
                </Text>
                <Text>
                    - Platform, üçüncü taraf web sitelerine veya hizmetlere bağlantılar içerebilir. Bu bağlantıların kullanımı, üçüncü tarafın gizlilik politikalarına tabidir.
                </Text>
                <Text>
                    **5. Gizlilik Politikası Değişiklikleri:**
                </Text>
                <Text>
                    - Gizlilik politikası zaman zaman güncellenebilir. Değişiklikler hakkında bilgilendirme yapılacaktır.
                </Text>
                <Text>
                    Bu Gizlilik Sözleşmesi'nin kabul edilmesi, Platformun kullanımıyla bağlantılı olarak kişisel verilerin toplanması ve işlenmesi konusunda açık rıza anlamına gelir.
                </Text>
                <Text>
                    Herhangi bir sorunuz veya endişeniz varsa, lütfen bizimle iletişime geçmekten çekinmeyin.
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
}

export default ConfidentialityAgreement;

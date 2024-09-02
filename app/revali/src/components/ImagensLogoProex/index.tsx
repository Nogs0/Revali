import React from 'react'
import { DimensionValue, Image, View } from 'react-native'
import style from './style'

interface ImageLogoProexProps {
    height: DimensionValue
}

export default function ImagensLogoProex(props: ImageLogoProexProps) {
    return (
        <View style={[style.container, {height: props.height}]}>
            <View style={style.image1Container}>
                <Image style={style.image1} source={require('@/assets/images/logo-verde-amarelo.png')} />
            </View>
            <View style={style.image2Container}>
                <Image style={style.image2} source={require('@/assets/images/selo-proex-40anos-1cor.png')} />
            </View>
        </View>
    )
}
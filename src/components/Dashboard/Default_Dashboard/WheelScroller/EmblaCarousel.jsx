import React from 'react'
import { IosPickerItem } from './EmblaCarouselIosPickerItem'

const EmblaCarousel = (props) => {
  const { loop } = props

  return (
    <div className="embla">
      <IosPickerItem
        slideCount={24}
        perspective="left"
        loop={loop}
        isLabel={false}
        />
      <IosPickerItem
        slideCount={2}
        perspective="right"
        loop={false}
        labels={['Hours', 'Days']}
        isLabel={true}
      />
    </div>
  )
}

export default EmblaCarousel

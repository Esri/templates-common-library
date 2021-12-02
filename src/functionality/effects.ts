import { toJSON, fromJSON } from "esri/layers/effects/jsonUtils";

export function getMergedEffect(
  presetLayerEffect: string,
  featureLayerView: __esri.FeatureLayerView
) {
  if (!presetLayerEffect) {
    return null;
  }

  // CONVERT EXISTING EFFECT AND PRESET LAYER EFFECT TO JSON
  const presetLayerEffectJSON = toJSON(presetLayerEffect);
  const existingEffect = toJSON(featureLayerView.layer.effect);

  // RETURN PRESET LAYER EFFECT IF THERE ARE NO EXISTING EFFECTS
  if (!existingEffect) {
    return fromJSON(presetLayerEffectJSON);
  }

  let effectToUse = [...existingEffect];

  if (presetLayerEffectJSON) {
    // ITERATE THROUGH PRESET LAYER EFFECT JSON
    presetLayerEffectJSON.forEach(presetLayerEffectItem => {
      // ITERATE THROUGH EXISTING EFFECT JSON
      effectToUse.forEach(existingEffectToUseItem => {
        const { value } = existingEffectToUseItem;
        // ITERATE THROUGH EXISTING EFFECT JSON VALUES
        value.forEach((effectValue, effectIndex) => {
          // REPLACE EXISTING EFFECT VALUE IF SAME TYPE IS PRESENT IN PRESET LAYER EFFECT
          if (effectValue.type === presetLayerEffectItem.type) {
            value[effectIndex] = presetLayerEffectItem;
          }
          // OTHERWISE MODIFY EXISTING EFFECT
          else {
            
            const notMerged = !existingEffectToUseItem.value.find(
              existingEffectItemToMerge =>
                existingEffectItemToMerge.type === presetLayerEffectJSON[0].type
            );

            // CHECK IF PRESET LAYER EFFECT HAS BEEN MERGED, IF NOT YET MERGED APPEND PRESET LAYER EFFECT TO EXISTING EFFECT
            if (notMerged) {
              existingEffectToUseItem.value = [
                ...existingEffectToUseItem.value,
                ...presetLayerEffectJSON
              ];
            }
          }
        });
      });
    });
  }
  const mergedEffect = fromJSON(effectToUse);
  return mergedEffect;
}

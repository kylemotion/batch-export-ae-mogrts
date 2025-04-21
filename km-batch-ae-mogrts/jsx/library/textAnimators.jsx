//var anim = app.project.activeItem.layer(1).Text.Animators.addProperty("ADBE Text Animator");

//add range selector
anim("ADBE Text Selectors").addProperty("ADBE Text Selector");

var animProperties = anim("ADBE Text Animator Properties");

//Add properties

//andchorPoint
animProperties.addProperty("ADBE Text Anchor Point 3D");

//position
animProperties.addProperty("ADBE Text Position 3D");

//scale
animProperties.addProperty("ADBE Text Scale 3D");

//skew
animProperties.addProperty("ADBE Text Skew");

//skew axis
animProperties.addProperty("ADBE Text Skew Axis");

//rotation
animProperties.addProperty("ADBE Text Rotation");

//Opacity
animProperties.addProperty("ADBE Text Opacity");
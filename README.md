# aframe-bytebeat

Bytebeat live coding A-Frame component, for live coding Bytebeat in the metaverse.


## Dependencies

Use this component in [A-Frame](https://aframe.io), together with the [Networked-Aframe](https://github.com/networked-aframe/networked-aframe) library and the [Aframe-Super-Keyboard](https://github.com/supermedium/aframe-super-keyboard) component.  

## Usage

### Add the bytebeat component to your desired A-Frame entity to include the Bytbeat Live Coding environment. A child entity including the Super-Keyboard component needs to be attached:

```html
    <a-scene>
        <a-entity bytebeat="">
              <a-entity
                id="keyboard"
                super-keyboard="hand:; imagePath:./aframe-bytebeat/;multipleInputs:true;align:center"
                byte-keyboard
                position="0 -0.6 +0.6"
                rotation="-30 0 0"
              ></a-entity>
	</a-entity>
    </a-scene>
```

###### Attributes:

| Property | Description | Default |
| ------------- | ------------- | ------------- |
| code | current source code  | _ |

### Add template of the live-coding object, including an Aframe-Super-Keyboard component, to your A-Scene assets:

```html
    <a-assets>
	<template id="bytebeat-template">
            <a-entity
              class="raycastable"
              geometry="primitive: box"
              material="wireframe:true"
              text="value:Hello World;side:double"
              resonance-audio-src="
            src:;
            loop: true;
            autoplay: true;"
              bytebeat=""
            >
              <a-entity
                id="keyboard"
                super-keyboard="hand:; imagePath:./aframe-bytebeat/;multipleInputs:true;align:center"
                byte-keyboard
                position="0 -0.6 +0.6"
                rotation="-30 0 0"
              ></a-entity>
            </a-entity>
        </template>
```

### Add template the Networked-Aframe NAF.shemas: 


```javascript
        if (!NAF.schemas.hasTemplate("#bytebeat-template")) {
          NAF.schemas.add({
            template: "#bytebeat-template",
            components: [
              "position",
              {
                component: "bytebeat",
                property: "code",
              },
            ],
          });
        }
```

### Live coding objects can be spawned into the environment by using the `bytebeat-persistent` component: 

```html
      <!-- Player Setting -->
      <a-entity
        id="rig"
        networked="template:#rig-template;"
        movement-controls
        bytebeat-persistent="template:#bytebeat-template; keyCode:32"
      >
```

###### Attributes:

| Property | Description | Default |
| ------------- | ------------- | ------------- |
| template | template of the object to be spawned  | '' |
| keyCode | key code to trigger spawned object  | 32 (space) |

## Run
See the Metabeat metaverse system for implementation: [Metabeat](https://github.com/AudioGroupCologne/Metabeat) 

## Acknowledgements

Bytebeat is know from the work by Viznut, found at [viznut.fi](http://viznut.fi/) 


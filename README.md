# aframe-bytebeat

Bytebeat live coding A-Frame component, for live coding Bytebeat in the metaverse.


## Dependencies

Use this component in [A-Frame](https://aframe.io), together with the [Networked-Aframe](https://github.com/networked-aframe/networked-aframe) library and the [Aframe-Super-Keyboard](https://github.com/supermedium/aframe-super-keyboard) component.  

## Usage

### Add the bytbeat component to your desired A-Frame entity to include the Bytbeat Live Coding environment. A child entity including the Super-Keyboard component needs to be attached:

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

Bytebeat Live Coding objects can also be spawned into the environment. See Glitch example for implementation.

## Run
See the Metabeat metaverse system for implementation: [Metabeat](https://github.com/AudioGroupCologne/Metabeat) 

## Acknowledgements

Bytebeat is know from the work by Viznut, found at [viznut.fi](http://viznut.fi/) 


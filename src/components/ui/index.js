import Vue from 'vue';

import BaseContainer from '@/components/ui/BaseContainer';
import BaseIcon from '@/components/ui/BaseIcon';
import BaseBtn from '@/components/ui/BaseBtn';
import BaseInput from '@/components/ui/BaseInput';
import ToggleText from '@/components/ui/ToggleText';
import ToggleTextarea from '@/components/ui/ToggleTextarea';

import VueInputAutowidth from 'vue-input-autowidth';
import VueTextareaAutoHeight from 'vue-textarea-autosize';

Vue.use(VueInputAutowidth);
Vue.use(VueTextareaAutoHeight);

const components = {
	BaseContainer,
	BaseIcon,
	BaseBtn,
	BaseInput,
	ToggleText,
	ToggleTextarea,
};

Object.keys(components).forEach(name => Vue.component(name, components[name]));

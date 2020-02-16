import Vue from 'vue';

import BaseContainer from '@/components/ui/BaseContainer';
import BaseIcon from '@/components/ui/BaseIcon';
import BaseBtn from '@/components/ui/BaseBtn';
import BaseInput from '@/components/ui/BaseInput';
import ToggleInput from '@/components/ui/ToggleInput';

const components = {
	BaseContainer,
	BaseIcon,
	BaseBtn,
	BaseInput,
	ToggleInput,
};

Object.keys(components).forEach(name => Vue.component(name, components[name]));

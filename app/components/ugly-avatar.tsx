

import { GenerateUglyAvatar } from '../../other/ugly-avatar/src/index'

export function Avatar() {
const avatarMarkup = new GenerateUglyAvatar();
const svg = avatarMarkup.generateFace()
  return (
    svg
  );
}

	/* const avatar = new GenerateUglyAvatar()
  const svg = avatar.generateFace()

	return (
		<div>
			<img src={svg} alt="Avatar" />
		</div>
	)
} */
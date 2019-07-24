import React from 'react'
import styled, {css} from 'styled-components';

const checkoutIcon = (props) => {

    return (
        <Checkout {...props}/>
    )
}



const Checkout = styled.div`
    background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNSIgaGVpZ2h0PSIyMyIgdmlld0JveD0iMCAwIDI1IDIzIj4KICAgIDxwYXRoIGZpbGw9IiM1OTU4NTkiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlPSIjNTk1ODU5IiBzdHJva2Utd2lkdGg9Ii44IiBkPSJNMTcuODYzIDE4LjEzMmMuOTI4IDAgMS42NzQuNzM5IDEuNjc0IDEuNjU3IDAgLjkyLS43NDYgMS42NTgtMS42NzQgMS42NTgtLjkyOCAwLTEuNjc1LS43MzktMS42NzUtMS42NTggMC0uOTE4Ljc0Ny0xLjY1NyAxLjY3NS0xLjY1N3ptLTguMzc0IDBjLjkyOSAwIDEuNjc1LjczOSAxLjY3NSAxLjY1NyAwIC45Mi0uNzQ2IDEuNjU4LTEuNjc1IDEuNjU4LS45MjggMC0xLjY3NC0uNzM5LTEuNjc0LTEuNjU4IDAtLjkxOC43NDYtMS42NTcgMS42NzQtMS42NTd6bTguMzc0LS41NTNjLTEuMjMgMC0yLjIzMy45OTMtMi4yMzMgMi4yMSAwIDEuMjE4IDEuMDAzIDIuMjExIDIuMjMzIDIuMjExIDEuMjMgMCAyLjIzMi0uOTkzIDIuMjMyLTIuMjEgMC0xLjIxOC0xLjAwMi0yLjIxMS0yLjIzMi0yLjIxMXptLTguMzc0IDBjLTEuMjMgMC0yLjIzMi45OTMtMi4yMzIgMi4yMUM3LjI1NyAyMS4wMDcgOC4yNiAyMiA5LjQ4OSAyMmMxLjIzIDAgMi4yMzMtLjk5MyAyLjIzMy0yLjIxIDAtMS4yMTgtMS4wMDMtMi4yMTEtMi4yMzMtMi4yMTF6bTcuNTM2LTkuMTE4aDUuMzczbC0uODQ2IDMuNTkyaC00LjUyN1Y4LjQ2em0tNS41ODIgMy41OTJoNS4wMjRWOC40NmgtNS4wMjR2My41OTJ6bS02LTMuNTkyaDUuNDQydjMuNTkySDYuMjFMNS40NDMgOC40NnptMTEuNTgyLTQuMTQ1aDYuMzVsLS44NDYgMy41OTJoLTUuNTA0VjQuMzE2em0tNS41ODIgMy41OTJoNS4wMjRWNC4zMTZoLTUuMDI0djMuNTkyek00LjU2MiA0LjMxNmg2LjMyM3YzLjU5Mkg1LjMyOWwtLjc2Ny0zLjU5MnpNLjI3OSAxQS4yNzguMjc4IDAgMCAwIDAgMS4yNzZjMCAuMTUzLjEyNS4yNzcuMjguMjc3aDMuMTIybDMgMTQuMDE0Yy0uMDUxLjE3NC4xMTUuMzcyLjI5Ni4zNTRoMTMuOTU2YS4yODkuMjg5IDAgMCAwIC4yODMtLjI3Ni4yODkuMjg5IDAgMCAwLS4yODMtLjI3N0g2LjkyNWwtLjU5My0yLjc2M0gyMS43N2EuMjg2LjI4NiAwIDAgMCAuMjctLjIxNkwyMy45OTQgNC4xYy4wMzctLjE2LS4xMDQtLjMzNi0uMjctLjMzN0g0LjQ0bC0uNTQxLTIuNTQ3QS4yODcuMjg3IDAgMCAwIDMuNjI5IDFILjI3OHoiIG9wYWNpdHk9Ii42Ii8+Cjwvc3ZnPg==");
    background-repeat: no-repeat;
    background-size:contain;
    height:21px;
    width:24px;
    cursor:pointer;
    transition: all 400ms ease;

    ${props => props.on && css`
        background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNSIgaGVpZ2h0PSIyMyIgdmlld0JveD0iMCAwIDI1IDIzIj48cGF0aCBmaWxsPSIjRjAwIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHN0cm9rZT0iI0YwMCIgc3Ryb2tlLXdpZHRoPSIuOCIgZD0iTTE3Ljg2MyAxOC4xMzJjLjkyOCAwIDEuNjc0LjczOSAxLjY3NCAxLjY1NyAwIC45Mi0uNzQ2IDEuNjU4LTEuNjc0IDEuNjU4LS45MjggMC0xLjY3NS0uNzM5LTEuNjc1LTEuNjU4IDAtLjkxOC43NDctMS42NTcgMS42NzUtMS42NTd6bS04LjM3NCAwYy45MjkgMCAxLjY3NS43MzkgMS42NzUgMS42NTcgMCAuOTItLjc0NiAxLjY1OC0xLjY3NSAxLjY1OC0uOTI4IDAtMS42NzQtLjczOS0xLjY3NC0xLjY1OCAwLS45MTguNzQ2LTEuNjU3IDEuNjc0LTEuNjU3em04LjM3NC0uNTUzYy0xLjIzIDAtMi4yMzMuOTkzLTIuMjMzIDIuMjEgMCAxLjIxOCAxLjAwMyAyLjIxMSAyLjIzMyAyLjIxMSAxLjIzIDAgMi4yMzItLjk5MyAyLjIzMi0yLjIxIDAtMS4yMTgtMS4wMDItMi4yMTEtMi4yMzItMi4yMTF6bS04LjM3NCAwYy0xLjIzIDAtMi4yMzIuOTkzLTIuMjMyIDIuMjFDNy4yNTcgMjEuMDA3IDguMjYgMjIgOS40ODkgMjJjMS4yMyAwIDIuMjMzLS45OTMgMi4yMzMtMi4yMSAwLTEuMjE4LTEuMDAzLTIuMjExLTIuMjMzLTIuMjExem03LjUzNi05LjExOGg1LjM3M2wtLjg0NiAzLjU5MmgtNC41MjdWOC40NnptLTUuNTgyIDMuNTkyaDUuMDI0VjguNDZoLTUuMDI0djMuNTkyem0tNi0zLjU5Mmg1LjQ0MnYzLjU5Mkg2LjIxTDUuNDQzIDguNDZ6bTExLjU4Mi00LjE0NWg2LjM1bC0uODQ2IDMuNTkyaC01LjUwNFY0LjMxNnptLTUuNTgyIDMuNTkyaDUuMDI0VjQuMzE2aC01LjAyNHYzLjU5MnpNNC41NjIgNC4zMTZoNi4zMjN2My41OTJINS4zMjlsLS43NjctMy41OTJ6TS4yNzkgMUEuMjc4LjI3OCAwIDAgMCAwIDEuMjc2YzAgLjE1My4xMjUuMjc3LjI4LjI3N2gzLjEyMmwzIDE0LjAxNGMtLjA1MS4xNzQuMTE1LjM3Mi4yOTYuMzU0aDEzLjk1NmEuMjg5LjI4OSAwIDAgMCAuMjgzLS4yNzYuMjg5LjI4OSAwIDAgMC0uMjgzLS4yNzdINi45MjVsLS41OTMtMi43NjNIMjEuNzdhLjI4Ni4yODYgMCAwIDAgLjI3LS4yMTZMMjMuOTk0IDQuMWMuMDM3LS4xNi0uMTA0LS4zMzYtLjI3LS4zMzdINC40NGwtLjU0MS0yLjU0N0EuMjg3LjI4NyAwIDAgMCAzLjYyOSAxSC4yNzh6IiBvcGFjaXR5PSIuNiIvPjwvc3ZnPg==");
    `}
`

export default checkoutIcon

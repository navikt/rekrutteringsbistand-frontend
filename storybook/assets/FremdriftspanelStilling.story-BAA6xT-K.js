import{aq as w,J as I,j as t,R as k,S as j,cn as x,cw as b,cv as g,co as u,O as y,cP as _}from"./iframe-BJZT-pV2.js";import{w as m,c as D}from"./ContextDecorators-GILeYuxF.js";import{F as N,A as v}from"./FullførtStilling-CJLiH8UK.js";import{R as T}from"./GjenåpneStillingKnapp-DBtFZiXZ.js";import{T as A}from"./TilgangskontrollForInnhold-BM1PHNoh.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-BBzNoh1n.js";import"./OrganisasjonsnummerAlert-BzNKGtv5.js";import"./VStack-C0iAkaF0.js";import"./BasePrimitive-BURutVTi.js";import"./List-CUa7SAJy.js";import"./Link-CTWJTCeg.js";import"./KandidatHendelseTag-mluJCksq.js";import"./Tag-Dhce9dMK.js";import"./ChatExclamationmark-vkU7yaSK.js";import"./FileXMark-eege6pqK.js";import"./Trash-DetofLY0.js";import"./HandShakeHeart-D3ZDILka.js";import"./Calendar-B5jaW0qy.js";import"./ThumbUp-q8PY1-rH.js";import"./ExclamationmarkTriangle-BVRlOXHG.js";import"./Table-BISCMbx9.js";import"./index-BgCKhpKW.js";import"./index-B40KJ5b4.js";import"./util-WEItX0rf.js";import"./DatoVelger-BRQMvRtF.js";import"./useDatepicker-DGWjt5YK.js";import"./useControllableState-Bc9HDHWi.js";import"./Modal-Bi4rj4XP.js";import"./floating-ui.react-CvzncKoC.js";import"./Date.Input-DxWRZeTN.js";import"./useFormField-CbAKSqsY.js";import"./ChevronDown-OwgFQKN0.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-C4CXiR91.js";import"./Modal.context-IYi_TOd5.js";import"./Popover-IQWetJBH.js";import"./DismissableLayer-Cw7xwM7S.js";import"./startOfMonth-BddoUXyY.js";import"./Select-U1rk8ELe.js";import"./endOfMonth-BFdbqdmu.js";import"./ArrowLeft-DHUSJjx1.js";import"./ArrowRight-J5OkF8zz.js";import"./isSameDay-BVeP-FH5.js";import"./Checkbox-CrIvF_iN.js";import"./Fieldset-BLjEFoVi.js";import"./accordion-DaHt14lf.js";import"./index-Cgi4dk0I.js";import"./index-Ch4WeAO6.js";import"./index-B4b2ls2S.js";import"./Box-CyFXhOAJ.js";import"./Bell-CMvUft5M.js";import"./PersonChat-CsZ56GDc.js";import"./Eye-DP1AJJpv.js";import"./ProgressBar-q0LVP6Xx.js";import"./useLatestRef-D9WSIWjQ.js";import"./ShieldLock-BquLnna8.js";import"./PadlockLocked-Bv7uGBKy.js";import"./EyeSlash-WgHBtYRO.js";import"./CircleSlash-iuf_C-t9.js";import"./Pencil-FbcvORJi.js";import"./FullførStillingModal-DOrpoevK.js";import"./PersonbrukerTekst-aAm2To7w.js";import"./ClockDashed-BZ6kC0et.js";import"./IkonNavnAvatar-DEt9SPOX.js";import"./umamiEvents-4lZbqD_K.js";import"./Tasklist-cVCaGeWg.js";import"./ErrorBoundary-BKKILANf.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=w(),d=I(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[d],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Yt={tags:["autodocs"],component:n},o={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},l={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown={false} />)
}`,...o.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown />)
}`,...l.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => {
    // Lukket kandidatliste og stoppet stilling -> Fullført visning
    const stillingsData = {
      ...mockBaseStilling,
      stilling: {
        ...mockBaseStilling.stilling,
        status: 'INACTIVE',
        publishedByAdmin: mockBaseStilling.stilling.publishedByAdmin || new Date().toISOString()
      }
    } as typeof mockBaseStilling;
    const liste = createKandidatlisteMock({
      lukket: true,
      antall: 4,
      status: InternKandidatstatus.AKTUELL,
      utfall: KandidatutfallTyper.FATT_JOBBEN,
      stillingsData
    });
    return withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown={false} />, liste, stillingsData);
  }
}`,...a.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => {
    const stillingsData = mockFormidling as typeof mockBaseStilling;
    const liste = createKandidatlisteMock({
      stillingsData,
      antall: 2
    });
    return withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown />, liste, stillingsData);
  }
}`,...p.parameters?.docs?.source}}};export{o as Aktiv,l as AktivDropdown,p as FormidlingVariant,a as Fullført,Yt as default};

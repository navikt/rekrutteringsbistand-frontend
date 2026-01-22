import{at as I,I as w,j as t,R as k,S as j,cs as x,cB as b,cA as g,ct as u,N as y,cU as N}from"./iframe-_Y_FQOIK.js";import{w as m,c as D}from"./ContextDecorators-CyTJGvbv.js";import{F as _,A as v}from"./FullførtStilling-3JQou8fw.js";import{R as T}from"./GjenåpneStillingKnapp-oeZBRUhp.js";import{T as A}from"./TilgangskontrollForInnhold-1KqoPLTr.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext--pywmHYz.js";import"./OrganisasjonsnummerAlert-NhjOxu42.js";import"./VStack-BV-kTNrI.js";import"./BasePrimitive-CgAYLi8z.js";import"./Box-s_VFObiR.js";import"./List-COiFA3Ep.js";import"./Link-BbIgnuLN.js";import"./KandidatHendelseTag-Bf_DYnTB.js";import"./Tag-Du44VU8x.js";import"./ChatExclamationmark-BurAkCe3.js";import"./FileXMark-BHxYWS4a.js";import"./Trash-DP-Yxt5I.js";import"./HandShakeHeart-D8fZXbUs.js";import"./Calendar-E4u3W48J.js";import"./ThumbUp-NH__amz1.js";import"./ExclamationmarkTriangle-CrL1M-JZ.js";import"./Table-Dd3Fr_8y.js";import"./index-QQgzqSqo.js";import"./index-B40KJ5b4.js";import"./util-D2yyjroG.js";import"./DatoVelger-B6NbrkrV.js";import"./useDatepicker-DcJSYz9w.js";import"./useControllableState-D-6TawYQ.js";import"./Modal-BGOOgZuu.js";import"./floating-ui.react-BcjM_8Wz.js";import"./useFormField-DesCrsSR.js";import"./ReadMore-CJ9HoYGx.js";import"./ChevronDown-bE3GWpqo.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-tdwdHZzr.js";import"./Modal.context-C_2IzOEE.js";import"./Popover-B4Z8-RGV.js";import"./DismissableLayer-B1s_qZ9h.js";import"./startOfMonth-DDZ5Mlpw.js";import"./Select-CKXHWzji.js";import"./endOfMonth-CR_KXGAB.js";import"./ArrowLeft-DZ1fe3o2.js";import"./ArrowRight-D5wLnD1K.js";import"./isSameDay-Cizp7HiB.js";import"./Checkbox-CPTONnif.js";import"./Fieldset-DHmNs7KX.js";import"./accordion-XPLWeMMg.js";import"./index-Bi7Xol--.js";import"./index-0qpqCbH5.js";import"./index-CdjQcBtp.js";import"./ProgressBar-Gn7MXI-e.js";import"./useValueAsRef-e9kOIaux.js";import"./Bell-DbN3pTDT.js";import"./PersonChat-Kp1e4TVX.js";import"./Eye-C4H_Gf4I.js";import"./ShieldLock-CcZPq4Ob.js";import"./PadlockLocked-QhawRV5B.js";import"./EyeSlash-BHzra0Ky.js";import"./CircleSlash-D9Zs80O9.js";import"./Pencil-IZ1c5UoK.js";import"./FullførStillingModal-DAT1iRaq.js";import"./PersonbrukerTekst-Dp06jxaQ.js";import"./ClockDashed-BUBc8IU7.js";import"./IkonNavnAvatar-BpnZ1JeI.js";import"./umamiEvents-4lZbqD_K.js";import"./Tasklist-CTTejxL7.js";import"./ErrorBoundary-giX3lTJo.js";function s({dropDown:r}){const{stillingsData:i,erEier:E}=I(),d=w(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[d],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(n=>n.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(n=>n.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(n=>n.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(_,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}s.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Yt={tags:["autodocs"],component:s},o={render:()=>m(()=>t.jsx(s,{dropDown:!1}))},l={render:()=>m(()=>t.jsx(s,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(s,{dropDown:!1}),i,r)}},p={render:()=>{const r=N,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(s,{dropDown:!0}),i,r)}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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

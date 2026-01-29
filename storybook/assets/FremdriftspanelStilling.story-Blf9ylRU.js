import{aw as I,I as w,j as t,R as k,S as j,cs as x,cB as b,cA as g,ct as u,N as y,cU as N}from"./iframe-CkzMmpLa.js";import{w as m,c as D}from"./ContextDecorators-1m3sbBI7.js";import{F as _,A as v}from"./FullførtStilling-D0P29T-0.js";import{R as T}from"./GjenåpneStillingKnapp-Car-p734.js";import{T as A}from"./TilgangskontrollForInnhold-B6xd0PRN.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-B0DkhyJ5.js";import"./OrganisasjonsnummerAlert-BC6tnlJ7.js";import"./VStack-CEafswES.js";import"./BasePrimitive-CKAMW9nX.js";import"./Box-CdBUid5D.js";import"./List--_c70d5t.js";import"./Link-D5Rkt3KG.js";import"./KandidatHendelseTag-Cywuef7d.js";import"./Tag-W8lZEK2d.js";import"./ChatExclamationmark-CjXK0Yi-.js";import"./FileXMark-Dvxqx_pO.js";import"./Trash-rapViwFi.js";import"./HandShakeHeart-C54kqonb.js";import"./Calendar-SXw1zHFn.js";import"./ThumbUp-D25aHmVk.js";import"./ExclamationmarkTriangle-C26Wmt--.js";import"./Table-u8yvfB5y.js";import"./index-CtEzum-F.js";import"./index-B40KJ5b4.js";import"./util-DgmYyb6R.js";import"./DatoVelger-C__FyM7_.js";import"./useDatepicker-acjTvBRB.js";import"./useControllableState-mdfm_5Wi.js";import"./Modal-F90IrM3f.js";import"./floating-ui.react-Wvsvcain.js";import"./useFormField-C6tQDjcO.js";import"./ReadMore-DMoTARwM.js";import"./ChevronDown-BFqUtr1G.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-CARqtUut.js";import"./Modal.context-DyolBz4N.js";import"./Popover-CzcBzvnM.js";import"./DismissableLayer-PtrKV-0-.js";import"./startOfMonth-CJa215FB.js";import"./Select-Du43L-vy.js";import"./endOfMonth-BSwdvIdM.js";import"./ArrowLeft-Gq_4pWFp.js";import"./ArrowRight-p-VzlmDt.js";import"./isSameDay-Q4WaKM42.js";import"./Checkbox-DoEFDo8f.js";import"./Fieldset-D9a5-U6o.js";import"./accordion-DPmVmItH.js";import"./index-DzidDCrZ.js";import"./index-Ch7WmhkD.js";import"./index-DYKAO4E5.js";import"./ProgressBar-Btm92-MC.js";import"./useValueAsRef-DxT7bC4F.js";import"./Bell-DmCF69he.js";import"./PersonChat-DUPvmZ21.js";import"./Eye-DB5DpSwx.js";import"./ShieldLock-BHsQZSRB.js";import"./PadlockLocked-DeCj7ctL.js";import"./EyeSlash-RLGl0WDm.js";import"./CircleSlash-BZYYUDsk.js";import"./Pencil-jGZ0UgjA.js";import"./FullførStillingModal-B_FVShqf.js";import"./PersonbrukerTekst-BtQ8lDxG.js";import"./ClockDashed-BPXo8Ws1.js";import"./IkonNavnAvatar-C5D-Bb6X.js";import"./umamiEvents-4lZbqD_K.js";import"./Tasklist-CbmECj7U.js";import"./ErrorBoundary-CcgPzyZw.js";function s({dropDown:r}){const{stillingsData:i,erEier:E}=I(),d=w(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[d],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(n=>n.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(n=>n.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(n=>n.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(_,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}s.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Yt={tags:["autodocs"],component:s},o={render:()=>m(()=>t.jsx(s,{dropDown:!1}))},l={render:()=>m(()=>t.jsx(s,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(s,{dropDown:!1}),i,r)}},p={render:()=>{const r=N,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(s,{dropDown:!0}),i,r)}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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

import{ax as I,U as w,j as t,y as k,S as x,cA as j,cI as b,cH as g,cB as u,Y as y,d0 as _}from"./iframe-T-H04Ezd.js";import{w as m,c as D}from"./ContextDecorators-Bo-G0gtm.js";import{F as N,A as v}from"./FullførtStilling-Dx_rwUTX.js";import{R as T}from"./GjenåpneStillingKnapp-GO3SIV46.js";import{T as A}from"./TilgangskontrollForInnhold-BbwpKrr_.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-C5uJS3BX.js";import"./OrganisasjonsnummerAlert-CfzuYHBj.js";import"./VStack-Bu-24W7v.js";import"./BasePrimitive-CD4yN9iL.js";import"./List-790aD13K.js";import"./Link-CpzkYPhO.js";import"./KandidatHendelseTag-DmNwrPEw.js";import"./Tag-B78aTiIZ.js";import"./ChatExclamationmark-CEq0XBXp.js";import"./FileXMark-B96StWBE.js";import"./Trash-gKkmwHxt.js";import"./HandShakeHeart-BMlil5Mu.js";import"./Calendar-Diq6AebV.js";import"./ThumbUp-C_xSVdgp.js";import"./Table-Wh8VKEqs.js";import"./index-4LmzDlw9.js";import"./index-B40KJ5b4.js";import"./util-DnEn7dJZ.js";import"./DatoVelger-CJeAmvkV.js";import"./useDatepicker-DMEGi37v.js";import"./useControllableState-CWJMUhnE.js";import"./Modal-CVI_Lh_E.js";import"./floating-ui.react-r5z69PAR.js";import"./Date.Input-j5cj3e6p.js";import"./useFormField-CIRHe0WO.js";import"./ChevronDown-Bh39XFR4.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-CCUoL0HN.js";import"./Modal.context-BlEMFX_m.js";import"./Popover-BgM0PIPS.js";import"./DismissableLayer-BNF07ANn.js";import"./startOfMonth-Btjd9WNT.js";import"./Select-CYxG95Aj.js";import"./endOfMonth-aIzCu-Ny.js";import"./ArrowLeft-IVU5lGaT.js";import"./ArrowRight-5ocw5wXI.js";import"./isSameDay-CGBfBodg.js";import"./Checkbox-DlwoujeI.js";import"./Fieldset-CPivdTxx.js";import"./accordion-CP1aEePS.js";import"./index-yx1HYVxh.js";import"./index-BlwPMVtg.js";import"./index-Bp9DM3Dy.js";import"./Box-CFctf1uM.js";import"./Bell-BiShM45_.js";import"./PersonChat-9gXQ25nv.js";import"./Eye-BGTlMIHO.js";import"./ProgressBar-CvLibq5F.js";import"./useLatestRef-DV6yFHwr.js";import"./EyeSlash-DoYqIV6g.js";import"./CircleSlash-5tJgoyED.js";import"./Pencil-CuZUsbe4.js";import"./FullførStillingModal-2Jux8vJd.js";import"./PersonbrukerTekst-vVBfGfOU.js";import"./ClockDashed-C0-jYlw2.js";import"./IkonNavnAvatar-Bfra5Qeh.js";import"./umamiEvents-DSuxYBjR.js";import"./Tasklist-CR1zSSCc.js";import"./ErrorBoundary-DYgrxmU4.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),d=w(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(x,{hooks:[d],children:e=>{const F=e.status===j.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Yt={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown={false} />)
}`,...l.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown />)
}`,...o.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,Yt as default};

import{aD as I,M as w,j as t,q as k,S as x,cx as j,cF as b,cE as g,cy as u,P as y,cU as _}from"./iframe-cL8k691U.js";import{w as m,c as E}from"./ContextDecorators-DE-P30tO.js";import{F as N,A as v}from"./FullførtStilling-CtF5Mfne.js";import{R as T}from"./GjenåpneStillingKnapp-DL4WhgbL.js";import{T as D}from"./TilgangskontrollForInnhold-BRmk4pQh.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-BG5hZA_D.js";import"./OrganisasjonsnummerAlert-NrQAbFYq.js";import"./VStack-D6jQNN7_.js";import"./BasePrimitive-CIPF40MM.js";import"./List-DTLTVjrE.js";import"./Link-BHJm8HGk.js";import"./KandidatHendelseTag-CvrfWkPD.js";import"./Tag-CTjVIrDR.js";import"./ChatExclamationmark-jLeRVtqi.js";import"./FileXMark-BrsEB1Ls.js";import"./Trash-Cz3qXP6k.js";import"./HandShakeHeart-BHN2WbX7.js";import"./Calendar-hrUqvLah.js";import"./ThumbUp-Da4_9b7o.js";import"./Table-CEVrlXgH.js";import"./util-G5pIvmc4.js";import"./parse-CiIzdRuc.js";import"./getDefaultOptions-BrAag-BB.js";import"./parseISO-D2I8ust4.js";import"./index-U826ktB1.js";import"./index-B40KJ5b4.js";import"./isBefore-CwK-2bUN.js";import"./util-CkGQiHDj.js";import"./accordion-JfJVPoed.js";import"./index-BNZ0M0a6.js";import"./index-SBArnH_p.js";import"./index-BOooXkj0.js";import"./ChevronDown-6zbRKb5v.js";import"./Box-BPGUwbGg.js";import"./Bell-CFDunb_L.js";import"./PersonChat-09awbdQ6.js";import"./Eye-ByHoqDQz.js";import"./ProgressBar-C01DYiH7.js";import"./EyeSlash-eg6LG1Al.js";import"./CircleSlash-DZeLc0qE.js";import"./Modal-BSzL7ywl.js";import"./floating-ui.react-DfESSBbJ.js";import"./Date.Input-jPYHkUOs.js";import"./useFormField-CGY7xPma.js";import"./useControllableState-DTJY2lFz.js";import"./Modal.context-BJG8Br9n.js";import"./Checkbox-B9MTgdTr.js";import"./Fieldset-D4SDdw6R.js";import"./Pencil-BvDzQrfX.js";import"./PersonbrukerTekst-Bp7RA0Dv.js";import"./ClockDashed-BEcH305D.js";import"./Tasklist-CxMFtqhF.js";import"./ErrorBoundary-CGTpWsJp.js";function n({dropDown:r}){const{stillingsData:i,erEier:A}=I(),d=w(i,A),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(D,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(D,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(x,{hooks:[d],children:e=>{const F=e.status===j.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Lt={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=E({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=E({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,Lt as default};
